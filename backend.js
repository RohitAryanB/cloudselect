// ==========================
// BACKEND PROVIDER DATA
// ==========================

const API_URL = "http://localhost:5000/api/providers";

async function loadProviderData() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const backendProviders = await response.json();

        console.log("Backend providers:", backendProviders);

        const providers = Array.isArray(backendProviders)
            ? backendProviders
            : backendProviders.providers;

        if (!Array.isArray(providers)) {
            throw new Error("Invalid provider data received from backend");
        }

        providers.forEach(provider => {

            const id = provider.slug;

            if (!id || !cloudProviders[id]) {
                return;
            }

            if (provider.price) {

                cloudProviders[id].price = {
                    ...cloudProviders[id].price,
                    ...provider.price
                };

            }

        });

        updatePricesOnCards();

        console.log("Provider data updated from backend.");

    } catch (error) {

        console.warn(
            "Backend unavailable. Using existing frontend data.",
            error
        );

        // Use frontend data until backend is connected
        updatePricesOnCards();
    }
}


// ==========================
// UPDATE CARD PRICES
// ==========================

function updatePricesOnCards() {

    document.querySelectorAll(".cloud-card").forEach(card => {

        const id = card.dataset.provider;

        if (!cloudProviders[id]) return;

        const price = cloudProviders[id].price;

        if (!price) return;

        const priceElement = card.querySelector(".price-value");

        if (!priceElement) return;

        priceElement.textContent =
            `${price.starting} – ${price.estimated} (Est.)`;

    });

}


// ==========================
// LOAD PROVIDER DATA
// ==========================

loadProviderData();