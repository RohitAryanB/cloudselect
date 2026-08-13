document.addEventListener("DOMContentLoaded", () => {

    console.log("Dashboard JS loaded");

    const params = new URLSearchParams(window.location.search);

    const providerId = params.get("id") || "aws";

    console.log("Provider ID:", providerId);

    const provider =
        DASHBOARD_DATA[providerId] ||
        DASHBOARD_DATA.aws;

    console.log("Selected:", provider);


    /* =========================
       ELEMENTS
    ========================= */

    const dashboardTitle =
        document.getElementById("dashboard-title");

    const providerTitle =
        document.getElementById("provider-title");

    const providerLogo =
        document.getElementById("provider-logo");

    const headerProviderLogo =
        document.getElementById("header-provider-logo");

    const regionName =
        document.getElementById("region-name");

    const accountProviderName =
        document.getElementById("account-provider-name");

    const accountId =
        document.getElementById("account-id");

    const accountName =
        document.getElementById("account-name");

    const totalResources =
        document.getElementById("total-resources");

    const runningResources =
        document.getElementById("running-resources");

    const storageUsed =
        document.getElementById("storage-used");

    const monthlyCost =
        document.getElementById("monthly-cost");

    const healthStatus =
        document.getElementById("health-status");

    const donutTotal =
        document.getElementById("donut-total");

    const currentCost =
        document.getElementById("current-cost");


    /* =========================
       BASIC PROVIDER INFORMATION
    ========================= */

    dashboardTitle.textContent =
        `${provider.name} Dashboard`;

    providerTitle.textContent =
        provider.name;

    accountProviderName.textContent =
        provider.name;

    regionName.textContent =
        provider.region;

    accountId.textContent =
        provider.account.id;

    accountName.textContent =
        provider.account.name;


    /* Provider logo */

    providerLogo.textContent =
        provider.logo;

    headerProviderLogo.textContent =
        provider.logo;


    /* =========================
       SUMMARY DATA
    ========================= */

    totalResources.textContent =
        provider.overview.totalResources;

    runningResources.textContent =
        provider.overview.runningResources;

    storageUsed.textContent =
        provider.overview.storageUsed;

    monthlyCost.textContent =
        `$${Number(provider.overview.monthlyCost).toFixed(2)}`;

    healthStatus.textContent =
        provider.overview.health;

    donutTotal.textContent =
        provider.overview.totalResources;

    currentCost.textContent =
        `$${Number(provider.overview.monthlyCost).toFixed(2)}`;


    /* =========================
       QUICK ACTIONS
    ========================= */

    renderQuickActions(
        provider.quickActions
    );


    /* =========================
       RESOURCE BREAKDOWN
    ========================= */

    renderResourceBreakdown(
        provider.resourceBreakdown
    );


    /* =========================
       RECENT ACTIVITY
    ========================= */

    renderActivity(
        provider.recentActivity
    );


    /* =========================
       RECOMMENDATIONS
    ========================= */

    renderRecommendations(
        provider.recommendations
    );


    /* =========================
       RESOURCE HEALTH
    ========================= */

    renderResourceHealth(
        provider.resourceHealth
    );


    /* =========================
       COPY ACCOUNT ID
    ========================= */

    const copyButton =
        document.getElementById("copy-account");

    if (copyButton) {

        copyButton.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(
                    provider.account.id
                );

                copyButton.classList.remove(
                    "fa-copy"
                );

                copyButton.classList.add(
                    "fa-check"
                );

                setTimeout(() => {

                    copyButton.classList.remove(
                        "fa-check"
                    );

                    copyButton.classList.add(
                        "fa-copy"
                    );

                }, 1500);

            } catch (error) {

                console.error(
                    "Could not copy account ID",
                    error
                );

            }

        });

    }


    /* =========================
       PROFILE BUTTON
    ========================= */

    const profileButton =
        document.getElementById("profile-btn");

    if (profileButton) {

        profileButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "login.html";

            }
        );

    }


    /* =========================
       LOGOUT
    ========================= */

    const logoutButton =
        document.getElementById("logout-btn");

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "login.html";

            }
        );

    }


    console.log(
        "Dashboard loaded:",
        provider.name
    );

});


/* =========================================================
   QUICK ACTIONS
========================================================= */

function renderQuickActions(actions) {

    const container =
        document.getElementById("quick-actions");

    if (!container) return;

    container.innerHTML = "";

    if (!actions || actions.length === 0) {

        container.innerHTML = `
            <p style="
                color:#64748b;
                font-size:11px;
                text-align:center;
                padding:20px;
            ">
                No quick actions available
            </p>
        `;

        return;
    }


    actions.slice(0, 6).forEach(action => {

        const button =
            document.createElement("button");

        button.className =
            "action-btn";

        button.innerHTML = `
            <i class="fa-solid ${action.icon}"></i>
            <span>${action.label}</span>
        `;


        button.addEventListener(
            "click",
            () => {

                console.log(
                    "Quick action:",
                    action.label
                );

                alert(
                    `${action.label} selected`
                );

            }
        );


        container.appendChild(button);

    });

}


/* =========================================================
   RESOURCE BREAKDOWN
========================================================= */

function renderResourceBreakdown(resources) {

    const container =
        document.getElementById("resource-legend");

    if (!container) return;

    container.innerHTML = "";


    resources.forEach(resource => {

        const item =
            document.createElement("div");

        item.className =
            "legend-item";


        item.innerHTML = `

            <span
                class="legend-dot"
                style="background:${resource.color}">
            </span>

            <span class="legend-name">
                ${resource.name}
            </span>

            <strong class="legend-value">
                ${resource.count}
            </strong>

        `;


        container.appendChild(item);

    });


    updateDonutChart(resources);

}


/* =========================================================
   DONUT CHART
========================================================= */

function updateDonutChart(resources) {

    const chart =
        document.querySelector(".donut-chart");

    if (!chart || !resources.length) return;


    let currentDegree = 0;

    const segments =
        resources.map(resource => {

            const start =
                currentDegree;

            const degree =
                resource.percentage * 3.6;

            currentDegree += degree;

            return `
                ${resource.color}
                ${start}deg
                ${currentDegree}deg
            `;

        });


    chart.style.background =
        `conic-gradient(${segments.join(",")})`;

}


/* =========================================================
   RECENT ACTIVITY
========================================================= */

function renderActivity(activities) {

    const container =
        document.getElementById("activity-list");

    if (!container) return;

    container.innerHTML = "";


    if (!activities || activities.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:30px 10px;
                color:#64748b;
                font-size:11px;
            ">
                No recent activity
            </div>
        `;

        return;

    }


    activities.forEach(activity => {

        const item =
            document.createElement("div");

        item.className =
            "activity-item";


        item.innerHTML = `

            <div
                class="activity-icon"
                style="background:${activity.color}">
                <i class="fa-solid ${activity.icon}"></i>
            </div>

            <div class="activity-text">
                ${activity.text}
            </div>

            <div class="activity-time">
                ${activity.time}
            </div>

        `;


        container.appendChild(item);

    });

}


/* =========================================================
   RECOMMENDATIONS
========================================================= */

function renderRecommendations(
    recommendations
) {

    const container =
        document.getElementById("recommendations");

    if (!container) return;

    container.innerHTML = "";


    if (
        !recommendations ||
        recommendations.length === 0
    ) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:30px 10px;
                color:#64748b;
                font-size:11px;
            ">
                No recommendations
            </div>
        `;

        return;

    }


    recommendations.forEach(recommendation => {

        const item =
            document.createElement("div");

        item.className =
            "recommendation";


        item.innerHTML = `

            <div
                class="recommendation-icon"
                style="background:${recommendation.color}">
                <i class="fa-solid ${recommendation.icon}"></i>
            </div>

            <div class="recommendation-content">

                <strong>
                    ${recommendation.title}
                </strong>

                <span>
                    ${recommendation.message}
                </span>

                <a href="#">
                    View recommendation
                    <i class="fa-solid fa-arrow-right"></i>
                </a>

            </div>

        `;


        container.appendChild(item);

    });

}


/* =========================================================
   RESOURCE HEALTH
========================================================= */

function renderResourceHealth(
    resources
) {

    const container =
        document.getElementById("resource-health");

    if (!container) return;

    container.innerHTML = "";


    if (!resources || resources.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:30px 10px;
                color:#64748b;
                font-size:11px;
            ">
                No resource health data
            </div>
        `;

        return;

    }


    resources.forEach(resource => {

        const item =
            document.createElement("div");

        item.className =
            "health-item";


        item.innerHTML = `

            <div class="health-icon">
                <i class="fa-solid ${resource.icon}"></i>
            </div>

            <div class="health-info">

                <strong>
                    ${resource.name}
                </strong>

                <span>
                    ${resource.count}
                </span>

            </div>

            <div class="health-badge">
                Healthy
            </div>

        `;


        container.appendChild(item);

    });

}