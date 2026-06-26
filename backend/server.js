console.log("THIS IS THE REAL SERVER FILE");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const leadRoutes = require("./routes/leadRoutes");
console.log("Loaded Routes:", leadRoutes);
app.use("/api/leads", leadRoutes);
app.get("/", (req, res) => {
    res.send("Mini CRM Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});