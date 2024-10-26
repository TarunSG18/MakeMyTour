// Get references to the forms
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Handle registration
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const response = await fetch("http://localhost:3306/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    alert(result.message); // Display the response message
});

// Handle login
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:3306/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    alert(result.message); // Display the response message
});
