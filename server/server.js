const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/auth-routes');




mongoose.connect("mongodb+srv://nomankhan02432:Nomankhan125@cluster0.7amjyyu.mongodb.net/").then(() =>
    console.log("MongoDB connected")).catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 5000;

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


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));    