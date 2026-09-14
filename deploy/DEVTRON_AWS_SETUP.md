# Wiring real AWS control into the CloudSelect backend

## What Devtron does here (and what it doesn't)

Devtron manages the Kubernetes deployment of the **backend pod itself**
(build → push image → roll out on your Minikube cluster). It has no
built-in concept of "control my EC2 instances" — that's not what it's
for. The actual AWS control happens inside `backend/src/services/awsEc2Service.js`,
which talks to AWS directly using the AWS SDK.

The only thing Devtron needs to do for this feature is make sure the
backend pod has AWS credentials available as environment variables at
runtime. That's it — one Kubernetes Secret, mounted as env vars.

```
 Browser (dashboard/cloud-control.html)
        │  HTTPS
        ▼
 Backend pod (deployed/managed by Devtron on Minikube)
        │  AWS SDK, using AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY
        ▼
 AWS EC2 API (your real, free-tier account)
```

GCP/Azure/Oracle routes exist in the API (`/api/cloud/gcp/...` etc.) and
return a clear "not connected" response, so the frontend can show them
as real options that light up once you actually have an account there —
no code changes needed later, just credentials.

## 1. Create a restricted IAM user (not your root keys)

In the AWS Console → IAM → Users → create a user with **programmatic
access only**, and attach a custom policy using
`deploy/aws-iam-policy.example.json` as a starting point. This limits
the key to describing instances and to starting/stopping/terminating
only instances tagged `ManagedBy=cloudselect` — i.e. only instances this
app created. Treat this as a template to tighten further (e.g. scoping
`Resource` to specific ARNs) rather than a final production policy.

Save the resulting Access Key ID / Secret Access Key somewhere safe —
you'll paste them into a Kubernetes Secret, never into the repo.

## 2. Create the Kubernetes Secret

Copy `deploy/k8s-aws-credentials-secret.example.yaml`, fill in your real
key values, and apply it directly with kubectl (do **not** commit the
filled-in file):

```bash
kubectl apply -f k8s-aws-credentials-secret.yaml -n <your-namespace>
```

## 3. Point the Devtron deployment at the secret

In the Devtron UI, open your backend application → **Config Maps &
Secrets** (or the equivalent Base Config → Environment Variables
screen) → add environment variables sourced from the
`cloudselect-aws-credentials` secret you just created:

- `AWS_ACCESS_KEY_ID` ← from secret key `accessKeyId`
- `AWS_SECRET_ACCESS_KEY` ← from secret key `secretAccessKey`

Also add plain (non-secret) env vars from `backend/.env.example`:
`AWS_ALLOWED_REGIONS`, `MAX_ACTIVE_INSTANCES`, `ALLOW_NON_FREE_TIER_LAUNCH`.

Trigger a deployment. The pod will now be able to call AWS.

## 4. Point the frontend at the backend

`cloud-control.html`/`login.html` currently call the backend at
`http://localhost:5000` (see `apiConfig.js`), matching how
`backend.js` already talks to `/api/providers`. Once the backend is
exposed by Devtron/Minikube (NodePort, port-forward, or ingress),
update the value there (or set `window.CLOUDSELECT_API_BASE` before
that script loads) to the real URL.

## Safety notes (worth keeping in mind on a free-tier account)

- Only `t2.micro` / `t3.micro` can be launched by default — anything
  else requires explicitly setting `ALLOW_NON_FREE_TIER_LAUNCH=true`.
- `MAX_ACTIVE_INSTANCES` (default 2) blocks launching more instances
  than that at once, across all states (running/stopped/pending).
- Start/Stop/Terminate only ever work on instances tagged
  `ManagedBy=cloudselect` — this dashboard can't touch pre-existing
  instances in your account.
- AWS Free Tier EC2 hours are still capped (750 hrs/month combined,
  first 12 months) — leaving an instance running continuously still
  counts against that even though nothing here launches non-free types.
