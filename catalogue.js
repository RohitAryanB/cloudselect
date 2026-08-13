/* =========================================================
   GET SELECTED PROVIDER
========================================================= */

const provider =
    new URLSearchParams(window.location.search).get("id");


/* =========================================================
   GET PROVIDER DATA
========================================================= */

const data =
    cloudProviders[provider];


if (!data) {

    document.getElementById("provider-name").textContent =
        "Provider Not Found";

} else {


    /* =====================================================
       PROVIDER NAME
    ===================================================== */

    document.getElementById("provider-name").textContent =
        data.name;


    /* =====================================================
       RATING
    ===================================================== */

    document.getElementById("rating").textContent =
        data.rating;


    /* =====================================================
       PROVIDER LOGO
    ===================================================== */

    const logo =
        document.getElementById("provider-logo");

    const providerLogo =
        PROVIDERS[provider];


    if (providerLogo) {

        logo.textContent =
            providerLogo.logo;

        logo.style.background =
            providerLogo.color;

        logo.style.color =
            providerLogo.textColor;

    }


    /* =====================================================
       TRIAL BADGE
    ===================================================== */

    const trialBadge =
        document.getElementById("trial-badge");


    trialBadge.textContent =
        data.trial;


    if (data.trial === "Active Free Trial") {

        trialBadge.style.background =
            "#dcfce7";

        trialBadge.style.color =
            "#15803d";

    }

    else if (data.trial === "Free Tier Available") {

        trialBadge.style.background =
            "#dbeafe";

        trialBadge.style.color =
            "#2563eb";

    }

    else {

        trialBadge.style.background =
            "#f1f5f9";

        trialBadge.style.color =
            "#64748b";

    }


    /* =====================================================
       OVERVIEW
    ===================================================== */

    document.getElementById("overview").textContent =
        data.description;


    /* =====================================================
       PRICING
    ===================================================== */

    const pricing =
        document.getElementById("pricing");


    pricing.innerHTML = `
        <p>
            <strong>Starting Price:</strong>
            ${data.price.starting}
        </p>

        <p>
            <strong>Estimated Monthly:</strong>
            ${data.price.estimated}
        </p>
    `;


    document.getElementById("pricing-link").href =
        data.price.calculator;


    /* =====================================================
       FREE OFFERS
    ===================================================== */

    const trialBox =
        document.getElementById("trial");


    trialBox.innerHTML = "";


    data.freeOffer.forEach(item => {

        const p =
            document.createElement("p");

        p.textContent =
            item;

        trialBox.appendChild(p);

    });


    /* =====================================================
       POPULAR SERVICES
    ===================================================== */

    const serviceList =
        document.getElementById("services");


    serviceList.innerHTML = "";


    data.popularServices.forEach(service => {

        const li =
            document.createElement("li");

        li.textContent =
            service;

        serviceList.appendChild(li);

    });


    /* =====================================================
       PRIMARY WORKLOADS
    ===================================================== */

    const workloadList =
        document.getElementById("workloads");


    workloadList.innerHTML = "";


    data.primaryWorkloads.forEach(workload => {

        const li =
            document.createElement("li");

        li.textContent =
            workload;

        workloadList.appendChild(li);

    });

}


/* =========================================================
   BACK BUTTON
========================================================= */

function goBack() {

    window.location.href =
        "index.html";

}


/* =========================================================
   OPEN DASHBOARD
========================================================= */

const dashboardBtn =
    document.getElementById("dashboard-btn");


if (dashboardBtn) {

    dashboardBtn.addEventListener("click", () => {

        window.location.href =
            `dashboard.html?id=${provider}`;

    });

}


/* =========================================================
   PROFILE MENU
========================================================= */

const profileButton =
    document.getElementById("profile-btn");


if (profileButton) {


    profileButton.addEventListener("click", (event) => {

        event.stopPropagation();


        /* ---------------------------------------------
           IF MENU ALREADY EXISTS → CLOSE IT
        --------------------------------------------- */

        const existingMenu =
            document.getElementById("profile-menu");


        if (existingMenu) {

            existingMenu.remove();

            return;

        }


        /* ---------------------------------------------
           CREATE MENU
        --------------------------------------------- */

        const profileMenu =
            document.createElement("div");


        profileMenu.id =
            "profile-menu";


        profileMenu.className =
            "profile-menu";


        profileMenu.innerHTML = `

            <div class="profile-menu-user">

                <div class="profile-menu-avatar">
                    JD
                </div>

                <div>

                    <strong>
                        John Doe
                    </strong>

                    <small>
                        CloudSelect User
                    </small>

                </div>

            </div>


            <div class="profile-menu-divider"></div>


            <button
                type="button"
                class="profile-menu-logout"
                id="catalogue-logout">

                <i class="fa-solid fa-right-from-bracket"></i>

                <span>
                    Logout
                </span>

            </button>

        `;


        document.body.appendChild(profileMenu);


        /* ---------------------------------------------
           POSITION MENU
        --------------------------------------------- */

        const rect =
            profileButton.getBoundingClientRect();


        profileMenu.style.top =
            `${rect.bottom + 8}px`;


        profileMenu.style.right =
            `${window.innerWidth - rect.right}px`;


        /* ---------------------------------------------
           LOGOUT
        --------------------------------------------- */

        const logoutButton =
            document.getElementById("catalogue-logout");


        if (logoutButton) {

            logoutButton.addEventListener("click", () => {

                window.location.href =
                    "login.html";

            });

        }

    });


    /* =====================================================
       CLOSE PROFILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        const profileMenu =
            document.getElementById("profile-menu");


        if (!profileMenu) return;


        if (
            !profileMenu.contains(event.target) &&
            !profileButton.contains(event.target)
        ) {

            profileMenu.remove();

        }

    });

}