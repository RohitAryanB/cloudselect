// ── ELEMENTS ──

const compareBar = document.getElementById("compare-bar");
const compareChips = document.getElementById("compare-chips");
const compareModal = document.getElementById("compare-modal");
const compareModalBody = document.getElementById("compare-modal-body");


// ── ADD / REMOVE ──

function addToCompare(id) {

    console.log("Adding", id);

    if (compareSet.size >= MAX_COMPARE) {
        alert(`You can compare only ${MAX_COMPARE} providers`);
        return;
    }

    compareSet.add(id);

    updateCompareButton(id, true);

    renderCompareBar();
}

function removeFromCompare(id) {

    console.log("Removing", id);

    compareSet.delete(id);

    updateCompareButton(id, false);

    renderCompareBar();
}


// ── BUTTON UPDATE ──

function updateCompareButton(id, active) {

    const btn = document.querySelector(`.compare-btn[data-id="${id}"]`);

    if (!btn) return;

    btn.textContent = active
        ? "✓ Added to Compare"
        : "Add to Compare";
}


// ── RENDER BAR ──

function renderCompareBar() {

    compareChips.innerHTML = "";

    compareSet.forEach(id => {

        const chip = document.createElement("div");

        chip.className = "compare-chip";

        chip.innerHTML = id.toUpperCase();

        chip.onclick = () => removeFromCompare(id);

        compareChips.appendChild(chip);

    });

    compareBar.classList.toggle("visible", compareSet.size > 0);
}


// ── BUTTON CLICK ──

document.querySelectorAll(".compare-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        console.log("Inside second listener", btn.dataset.id);

        const id = btn.dataset.id;

        if (compareSet.has(id)) {
            removeFromCompare(id);
        } else {
            addToCompare(id);
        }

        console.log("Current Compare Set", [...compareSet]);

    });

});


// ── CLEAR ──

document.getElementById("compare-clear").addEventListener("click", () => {

    compareSet.clear();

    document.querySelectorAll(".compare-btn").forEach(btn => {
        btn.textContent = "Add to Compare";
    });

    renderCompareBar();

});


// ── MODAL ──

document.getElementById("compare-now-btn").addEventListener("click", () => {

    const ids = [...compareSet];

    console.log("Compare Now", ids);

    if (ids.length < 2) {
        alert("Select at least 2 providers to compare");
        return;
    }

    let html = `
    <table class="compare-table">
        <thead>
            <tr>
                <th>Feature</th>
    `;

    ids.forEach(id => {
        html += `<th>${PROVIDERS[id].label}</th>`;
    });

    html += `
            </tr>
        </thead>
        <tbody>
    `;

    const rows = [
    ["Provider", id => cloudProviders[id].name],

    ["Trial Status", id => cloudProviders[id].trial],

    ["Price Range", id =>
    `${cloudProviders[id].price.starting} – ${cloudProviders[id].price.estimated}`
    ],

    ["Free Offers", id => 
        cloudProviders[id].freeOffer.join(", ")
    ],

    ["Primary Workloads", id =>
        cloudProviders[id].primaryWorkloads.join(", ")
    ],

    ["Popular Services", id =>
        cloudProviders[id].popularServices.join(", ")
    ],

    ["Rating", id => cloudProviders[id].rating]
];

    rows.forEach(row => {

        html += `<tr><td>${row[0]}</td>`;

        ids.forEach(id => {
            html += `<td>${row[1](id)}</td>`;
        });

        html += `</tr>`;

    });

    html += `
        </tbody>
    </table>
    `;

    compareModalBody.innerHTML = html;

    compareModal.classList.add("visible");

});

document.getElementById("modal-close-btn").addEventListener("click", () => {
    compareModal.classList.remove("visible");
});