// ── ICON BAR ACTIVE ──

document.querySelectorAll(".icon-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".icon-btn").forEach(b => {
            b.classList.remove("active");
        });

        btn.classList.add("active");

    });

});


// ── VIEW FULL CATALOGUE ──

const catalogueButtons = document.querySelectorAll(".catalogue-btn");

console.log("Catalogue buttons found:", catalogueButtons.length);

catalogueButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        const id = btn.dataset.id;

        console.log("Opening catalogue:", id);

        if (!id) {
            alert("Provider not found!");
            return;
        }

        window.location.href = `catalogue.html?id=${id}`;

    });

});


// ==========================
// PROFILE DROPDOWN
// ==========================

const profileMenu = document.getElementById("profile-menu");
const profileDropdown = document.querySelector(".profile-dropdown");

if (profileMenu && profileDropdown) {

    profileMenu.addEventListener("click", (e) => {

        e.stopPropagation();

        profileDropdown.classList.toggle("show");

    });

    document.addEventListener("click", () => {

        profileDropdown.classList.remove("show");

    });

}