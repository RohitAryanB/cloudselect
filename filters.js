// ── DOM ELEMENTS ──
const cards = document.querySelectorAll(".cloud-card");
const searchInput = document.getElementById("search-input");
const noResults = document.getElementById("no-results");
const resetBtn = document.getElementById("reset-btn");

// ── FILTER LOGIC ──
function getActiveProviders() {
  const checks = document.querySelectorAll("#provider-filters input:checked");
  return checks.length === 0 ? null : Array.from(checks).map(c => c.value);
}

function getActiveServices() {
  const checks = document.querySelectorAll("#service-filters input:checked");
  return checks.length === 0 ? null : Array.from(checks).map(c => c.value);
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const providers = getActiveProviders();
  const services = getActiveServices();

  let visible = 0;

  cards.forEach(card => {
    const cp = card.dataset.provider;
    const cs = card.dataset.services.split(",");
    const csearch = card.dataset.search.toLowerCase();

    let show = true;

    // Provider filter
    if (providers && !providers.includes(cp)) show = false;

    // Service filter
    if (services && !services.every(s => cs.includes(s))) show = false;

    // Search filter
    if (query && !csearch.includes(query) && !cp.includes(query)) show = false;

    card.classList.toggle("hidden", !show);

    if (show) visible++;
  });

  noResults.style.display = visible === 0 ? "block" : "none";
}

// ── RESET FILTERS ──
if (resetBtn) {
  resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    document.querySelectorAll("#provider-filters input")
      .forEach(cb => cb.checked = false);

    document.querySelectorAll("#service-filters input")
      .forEach(cb => cb.checked = false);

    applyFilters();
  });
}

// ── EVENTS ──
searchInput.addEventListener("input", applyFilters);

document.querySelectorAll("#provider-filters input").forEach(cb => {
  cb.addEventListener("change", applyFilters);
});

document.querySelectorAll("#service-filters input").forEach(cb => {
  cb.addEventListener("change", applyFilters);
});

// Initial load
applyFilters();