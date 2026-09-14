// Shared backend base URL for pages that need to call the API
// (login, cloud-control). Matches the pattern already used in backend.js.
//
// For a Devtron/Kubernetes deployment, either edit this value once the
// backend is exposed (NodePort/ingress URL), or set
// window.CLOUDSELECT_API_BASE = "https://your-backend-url"
// in a small inline <script> before this file loads.
const API_BASE_URL = window.CLOUDSELECT_API_BASE || "http://localhost:5000";
