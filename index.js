const express = require("express");
const app = express();
const dotenv = require('dotenv').config()
const cors = require("cors");
const bodyParser = require('body-parser');
const { connectDB } = require("./config/conn");

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const userRoutes = require("./routes/route");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.send("api is running...");
})

app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));