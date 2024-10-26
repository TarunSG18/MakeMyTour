const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        document.getElementById("message").textContent = result.message;

        if (response.ok) {
            // Redirect to dashboard or other page
            window.location.href = "/dashboard";
        }
    } catch (error) {
        document.getElementById("message").textContent = "Login failed.";
    }
});
