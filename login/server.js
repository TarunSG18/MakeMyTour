const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "TSG",  // Replace with your MySQL host
  user: "root",  // Replace with your MySQL username
  password: "12345678",  // Replace with your MySQL password
  database: "auth_db"  // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Register Endpoint
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await db.promise().query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    await db.promise().query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const [userResults] = await db.promise().query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (userResults.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userResults[0];

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Start the server
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
