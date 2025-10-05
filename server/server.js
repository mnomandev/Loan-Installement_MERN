const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/auth-routes');
const loanRouter = require('./routes/loan/loan-routes');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
    cors({
         origin: [
    "https://loaninstallment.netlify.app",  // ✅ exact frontend domain
      "http://localhost:5173"                 // for local dev
    ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
       
    }))

app.use(cookieParser());
app.use(express.json());

// Use the routers
app.use("/api/auth", authRouter);
app.use("/api/loans", loanRouter);  


app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Export the app instead of listening
module.exports = app;  