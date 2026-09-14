// Real AWS EC2 control panel. Talks to /api/cloud/:provider/* on the backend.
// GCP/Azure/Oracle tabs are shown but disabled since no account is connected —
// flip them on later by simply enabling the button once that provider's
// credentials exist server-side (backend/src/controllers/cloudController.js).

document.addEventListener("DOMContentLoaded", () => {

    let activeProvider = "aws";
    let meta = { regions: [], instanceTypes: [] };
    let pendingConfirmAction = null;

    const token = localStorage.getItem("cloudselect_token");

    const authWarning = document.getElementById("auth-warning");
    const apiErrorBanner = document.getElementById("api-error-banner");
    const launchForm = document.getElementById("launch-form");
    const launchBtn = document.getElementById("launch-btn");
    const regionSelect = document.getElementById("launch-region");
    const viewRegionSelect = document.getElementById("view-region");
    const typeSelect = document.getElementById("launch-instance-type");
    const tbody = document.getElementById("instances-tbody");
    const refreshBtn = document.getElementById("refresh-btn");
    const logoutBtn = document.getElementById("logout-btn");

    const confirmModal = document.getElementById("confirm-modal");
    const confirmTitle = document.getElementById("confirm-title");
    const confirmMessage = document.getElementById("confirm-message");
    const confirmOk = document.getElementById("confirm-ok");
    const confirmCancel = document.getElementById("confirm-cancel");

    if (!token) {
        authWarning.style.display = "block";
        launchBtn.disabled = true;
    }

    function authHeaders() {
        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    }

    function showApiError(message) {
        apiErrorBanner.textContent = message;
        apiErrorBanner.style.display = "block";
    }
    function clearApiError() {
        apiErrorBanner.style.display = "none";
        apiErrorBanner.textContent = "";
    }

    async function api(path, options = {}) {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers: authHeaders(),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.success === false) {
            throw new Error(data.error || `Request failed (${response.status})`);
        }
        return data;
    }

    function openConfirm(title, message, onConfirm) {
        confirmTitle.textContent = title;
        confirmMessage.textContent = message;
        pendingConfirmAction = onConfirm;
        confirmModal.style.display = "flex";
    }
    confirmCancel.addEventListener("click", () => {
        confirmModal.style.display = "none";
        pendingConfirmAction = null;
    });
    confirmOk.addEventListener("click", async () => {
        confirmModal.style.display = "none";
        if (pendingConfirmAction) await pendingConfirmAction();
        pendingConfirmAction = null;
    });

    // ── Provider tabs ──
    document.querySelectorAll(".cc-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.disabled) return;
            document.querySelectorAll(".cc-tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeProvider = btn.dataset.provider;
            loadMetaAndInstances();
        });
    });

    function populateSelect(select, options, labelFn) {
        select.innerHTML = "";
        options.forEach(opt => {
            const el = document.createElement("option");
            el.value = opt.type || opt.region;
            el.textContent = labelFn(opt);
            select.appendChild(el);
        });
    }

    async function loadMeta() {
        const res = await api(`/api/cloud/${activeProvider}/meta`);
        meta = res.data;
        populateSelect(regionSelect, meta.regions, r => r.label || r.region);
        populateSelect(viewRegionSelect, meta.regions, r => r.label || r.region);
        populateSelect(typeSelect, meta.instanceTypes, t =>
            `${t.type} — ${t.vCpus} vCPU / ${t.memoryGiB} GiB${t.freeTier ? " (Free tier)" : ""}`
        );
    }

    function stateClass(state) {
        return `cc-state cc-state-${state || "unknown"}`;
    }

    function renderInstances(instances) {
        if (!instances.length) {
            tbody.innerHTML = `<tr><td colspan="6" class="cc-empty">No instances yet — launch one above.</td></tr>`;
            return;
        }

        tbody.innerHTML = "";
        instances.forEach(inst => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${inst.name}</td>
                <td><code>${inst.instanceId}</code></td>
                <td>${inst.instanceType}</td>
                <td><span class="${stateClass(inst.state)}">${inst.state}</span></td>
                <td>${inst.publicIp || "—"}</td>
                <td class="cc-row-actions"></td>
            `;

            const actionsCell = tr.querySelector(".cc-row-actions");

            if (inst.state === "stopped") {
                actionsCell.appendChild(makeActionButton("Start", "cc-btn-ghost", () =>
                    runAction("start", inst)));
            }
            if (inst.state === "running") {
                actionsCell.appendChild(makeActionButton("Stop", "cc-btn-ghost", () =>
                    openConfirm("Stop instance?", `Stop ${inst.name} (${inst.instanceId})?`, () => runAction("stop", inst))));
            }
            actionsCell.appendChild(makeActionButton("Terminate", "cc-btn-danger", () =>
                openConfirm("Terminate instance?", `This permanently deletes ${inst.name} (${inst.instanceId}). This cannot be undone.`, () => runAction("terminate", inst))));

            tbody.appendChild(tr);
        });
    }

    function makeActionButton(label, cls, handler) {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.className = `cc-btn cc-btn-sm ${cls}`;
        btn.addEventListener("click", handler);
        return btn;
    }

    async function runAction(action, inst) {
        clearApiError();
        try {
            const region = viewRegionSelect.value;
            if (action === "start") {
                await api(`/api/cloud/${activeProvider}/instances/${inst.instanceId}/start`, {
                    method: "POST", body: JSON.stringify({ region }),
                });
            } else if (action === "stop") {
                await api(`/api/cloud/${activeProvider}/instances/${inst.instanceId}/stop`, {
                    method: "POST", body: JSON.stringify({ region }),
                });
            } else if (action === "terminate") {
                await api(`/api/cloud/${activeProvider}/instances/${inst.instanceId}?region=${encodeURIComponent(region)}`, {
                    method: "DELETE",
                });
            }
            await loadInstances();
        } catch (err) {
            showApiError(err.message);
        }
    }

    async function loadInstances() {
        clearApiError();
        try {
            const region = viewRegionSelect.value;
            if (!region) return;
            const res = await api(`/api/cloud/${activeProvider}/instances?region=${encodeURIComponent(region)}`);
            renderInstances(res.data);
        } catch (err) {
            showApiError(err.message);
            renderInstances([]);
        }
    }

    async function loadMetaAndInstances() {
        clearApiError();
        try {
            await loadMeta();
            await loadInstances();
        } catch (err) {
            showApiError(err.message);
        }
    }

    viewRegionSelect.addEventListener("change", loadInstances);
    refreshBtn.addEventListener("click", loadInstances);

    launchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearApiError();

        const name = document.getElementById("launch-name").value.trim();
        const region = regionSelect.value;
        const instanceType = typeSelect.value;
        const keyName = document.getElementById("launch-key-name").value.trim();

        openConfirm(
            "Launch this instance?",
            `This will create a real ${instanceType} instance in ${region} on your AWS account. It may incur cost if it falls outside free-tier limits or usage.`,
            async () => {
                launchBtn.disabled = true;
                launchBtn.textContent = "Launching...";
                try {
                    await api(`/api/cloud/${activeProvider}/instances`, {
                        method: "POST",
                        body: JSON.stringify({ region, instanceType, name, keyName: keyName || undefined }),
                    });
                    launchForm.reset();
                    viewRegionSelect.value = region;
                    await loadInstances();
                } catch (err) {
                    showApiError(err.message);
                } finally {
                    launchBtn.disabled = false;
                    launchBtn.innerHTML = `<i class="fa-solid fa-rocket"></i> Launch instance`;
                }
            }
        );
    });

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("cloudselect_token");
            localStorage.removeItem("cloudselect_user");
            window.location.href = "login.html";
        });
    }

    if (token) {
        loadMetaAndInstances();
    }
});
