const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/loginDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Registration endpoint (for adding users)
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).send({ message: "Error registering user" });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.send({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
