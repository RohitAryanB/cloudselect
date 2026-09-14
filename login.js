// Wires the existing login.html form to the real backend (/api/auth).
// Successful login stores a JWT in localStorage, which cloud-control.js
// then sends as "Authorization: Bearer <token>" on every request.

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const nameFieldGroup = document.getElementById("name-field-group");
    const nameInput = document.getElementById("login-name");
    const errorBox = document.getElementById("login-error");
    const submitBtn = document.getElementById("login-submit-btn");
    const toggleLink = document.getElementById("toggle-register-link");
    const signupPromptText = document.getElementById("signup-prompt-text");

    let mode = "login"; // or "register"

    function showError(message) {
        errorBox.textContent = message;
        errorBox.style.display = "block";
    }

    function clearError() {
        errorBox.style.display = "none";
        errorBox.textContent = "";
    }

    // If already logged in, skip straight to the dashboard.
    if (localStorage.getItem("cloudselect_token")) {
        window.location.href = "dashboard.html";
        return;
    }

    if (toggleLink) {
        toggleLink.addEventListener("click", (e) => {
            e.preventDefault();
            mode = mode === "login" ? "register" : "login";
            clearError();

            if (mode === "register") {
                nameFieldGroup.style.display = "block";
                submitBtn.textContent = "Create Account";
                toggleLink.textContent = "Sign In instead";
                signupPromptText.textContent = "Already have an account?";
            } else {
                nameFieldGroup.style.display = "none";
                submitBtn.textContent = "Sign In";
                toggleLink.textContent = "Create Account";
                signupPromptText.textContent = "Don't have an account?";
            }
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearError();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            showError("Please enter both email and password.");
            return;
        }

        submitBtn.disabled = true;
        const originalLabel = submitBtn.textContent;
        submitBtn.textContent = mode === "register" ? "Creating account..." : "Signing in...";

        try {
            const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
            const body = mode === "register"
                ? { name: nameInput.value.trim(), email, password }
                : { email, password };

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Something went wrong.");
            }

            localStorage.setItem("cloudselect_token", data.token);
            localStorage.setItem("cloudselect_user", JSON.stringify(data.user));

            window.location.href = "dashboard.html";

        } catch (err) {
            showError(err.message || "Unable to reach the backend. Is it running?");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
        }
    });

});
