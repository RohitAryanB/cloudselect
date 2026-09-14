// Shared retractable-sidebar behavior for dashboard.html and cloud-control.html.
// Adds a floating toggle button, collapses/expands the fixed sidebar, and
// remembers the user's choice across pages via localStorage.

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector(".content");
    if (!sidebar || !content) return;

    const STORAGE_KEY = "cloudselect_sidebar_collapsed";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "sidebar-toggle-btn";
    toggleBtn.setAttribute("aria-label", "Toggle sidebar");
    toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.appendChild(toggleBtn);

    function applyState(collapsed) {
        sidebar.classList.toggle("collapsed", collapsed);
        content.classList.toggle("sidebar-collapsed", collapsed);
        toggleBtn.classList.toggle("sidebar-open", !collapsed);
    }

    // Default: collapsed on narrow viewports (e.g. embedded/narrow browser panels),
    // otherwise honor whatever the user last chose.
    const stored = localStorage.getItem(STORAGE_KEY);
    const collapsedByDefault = window.innerWidth < 900;
    applyState(stored !== null ? stored === "true" : collapsedByDefault);

    toggleBtn.addEventListener("click", () => {
        const nowCollapsed = !sidebar.classList.contains("collapsed");
        applyState(nowCollapsed);
        localStorage.setItem(STORAGE_KEY, String(nowCollapsed));
    });
});
