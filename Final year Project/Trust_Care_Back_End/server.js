const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users",userRoutes);

app.listen(5000, () => {
    console.log("server running on port 5000 ");
});