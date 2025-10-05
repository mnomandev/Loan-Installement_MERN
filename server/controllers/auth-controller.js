const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register Admin (only once)
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists. You cannot register another one.",
      });
    }

    // Check if email already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use! Please try another.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      role: "admin", // force role to admin
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Login (Admin only)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser || checkUser.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Only admin can login.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // ✅ Always use consistent cookie settings for cross-site cookies
    res
      .cookie("token", token, {
        httpOnly: true,        // prevent JS access (XSS protection)
        secure: true,          // must be true for HTTPS (Vercel/Netlify)
        sameSite: "none",      // allow cross-site cookies
        path: "/",             // cookie visible to all routes
        maxAge: 60 * 60 * 1000 // 1 hour
      })
      .json({
        success: true,
        message: "Admin logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
        },
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// ✅ Logout (must match the same options)
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  }).json({
    success: true,
    message: "Logged out successfully!",
  });
};


module.exports = { registerUser, loginUser, logoutUser };
