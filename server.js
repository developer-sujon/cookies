const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow frontend (127.0.0.1:3000) to make requests and receive cookies
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    // Allow all origins (but still allow credentials)
    callback(null, true);
  },
  credentials: true, // Allow cookies and other credentials
}));

// Login route
app.post("/login", (req, res) => {
  const accessToken = "your-access-token";
  const refreshToken = "your-refresh-token";

  // Set HttpOnly cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,        // Prevent access by JavaScript (optional for manual set)
    secure: true,         // Set true in production with HTTPS
    sameSite: "None",       // Adjust based on cross-site cookie policy
    maxAge: 3600000,       // 1 hour expiration
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  });

  res.json({
    message: "Login successful",
   
  });
});

// Route to check cookies
app.get("/check", (req, res) => {
  console.log(req.cookies);
  
  const token = req.cookies.accessToken;
  if (token) {
    res.json({ message: "Token found", token });
  } else {
    res.status(401).json({ message: "Token not found" });
  }
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
