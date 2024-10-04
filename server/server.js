const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Enable CORS for your frontend domain and allow credentials
app.use(
  cors({
    origin: "http://192.168.0.118:3000", // Your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(express.json());
app.use(cookieParser());

// Login route to set the cookie
app.post("/login", (req, res) => {
  res.cookie("token", "your_token_value", {
    httpOnly: true, // Prevents JavaScript access to cookie
    secure: true, // Set to true for HTTPS in production
    sameSite: "None", // Use 'Lax' for same-origin requests, change to 'None' if cross-origin
    maxAge: 3600000, // 1 hour expiration time
  });
  res.json({ message: "Login successful" });
});

// Route to check if the cookie is present
app.get("/check", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    res.json({ message: "Token found", token });
  } else {
    res.status(401).json({ message: "Token not found" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://192.168.0.118:5000");
});
