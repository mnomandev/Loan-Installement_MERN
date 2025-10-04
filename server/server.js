const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/auth-routes');
const loanRouter = require('./routes/loan/loan-routes');

dotenv.config();

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error:", error));

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
        credentials: true,
    }))

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/loans", loanRouter);  


app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Export the app instead of listening
module.exports = app;  