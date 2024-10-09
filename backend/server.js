const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { sequelize } = require("./models");
const adminRouter = require("./routes/admin.route");
const managerRoute = require("./routes/manager.route");
const userRoute = require("./routes/user.route");
const pizzaRoute = require("./routes/pizza.route");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const axios = require("axios");
const { Sequelize } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Food Ordering API!");
});
// admin
app.use("/api", adminRouter);
// manager
app.use("/api", managerRoute);

//user route

app.use("/api", userRoute);

// piza route
app.use("/api", pizzaRoute);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error creating database tables:", error);
  });
