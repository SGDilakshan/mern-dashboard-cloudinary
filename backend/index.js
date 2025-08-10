const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/components", require("./routes/componentRoutes"));

app.use("/api/header", require("./route/headerRoutes.route.js"));
app.use("/api/navbar", require("./route/navbarRoutes.route.js"));
app.use("/api/footer", require("./route/footerRoutes.route.js"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
