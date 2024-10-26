async function signup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const message = document.getElementById("register-message");
  
    

    if (password !== confirmPassword) {
      message.innerText = "Passwords do not match.";
      return;
    }
    else {
      window.location.href = "login.html";
    }
  
    try {
      const response = await fetch("http://localhost:3306/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });
  
      const data = await response.json();
      message.innerText = data.message;
  
    } catch (error) {
      console.error("Error:", error);
      message.innerText = "An error occurred.";
    }
  }
  async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
  
    try {
      const response = await fetch("http://localhost:3306/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
      message.innerText = data.message;
  
    } catch (error) {
      console.error("Error:", error);
      message.innerText = "An error occurred.";
    }
  }
  
  