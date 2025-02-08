const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", success: true });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }

    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Login Controller (Sets HTTP-only Cookie)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Invalid email or password", success: false });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: "Invalid email or password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Store token in HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents client-side JS access (XSS protection)
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 24 hours expiration
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Logout Controller (Clears Cookie)
const logout = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully", success: true });
};

// Get User Session (Check Auth)
const getSession = (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authenticated", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.json({
      success: true,
      user: { id: decoded._id, email: decoded.email },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", success: false });
  }
};

module.exports = { signup, login, logout, getSession };
