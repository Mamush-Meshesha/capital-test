// // server.js
// import dotenv from "dotenv"
// dotenv.config()
// import express from "express";
// import Database from "./config/index.js";
// import router from "./routes/user.route.js";

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const db = new Database(process.env.NODE_ENV || "development");

// db.connect()
//   .then(() => {
//     const models = db.getModels();
//     app.use(router(models)); // Pass models to the router

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to connect to the database:", err);
//     process.exit(1);
//   });

const express = require('express');
 require("dotenv").config()
// const { sequelize } = require('./models'); 
const {
  sequelize,
  Admin,
  Role,
  RolePermission,
  Manager,
  Customer,
  Restaurant,
  Menu,
  Topping,
  Order,
  OrderItem,
} = require("./models"); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Food Ordering API!');
});

// Customer routes
app.post('/customers', async (req, res) => {
  try {
    const { name, email, password, phone_number,location } = req.body;
    const customer = await Customer.create({ name, email, password, phone_number });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/manager", async (req, res) => {
  const { name, email, location, password, phone_number } = req.body
  const data = {
    name,
    email,
    location,
    password,
    phone_number
  }
  try {
    const response = await Manager.create(data)
    res.status(201).json(response)
  } catch (error) {
    console.log(error)
  }
})

// Admin routes
app.post('/admins', async (req, res) => {
  try {
    const { name, email, password, phone_number, } = req.body;
    const admin = await Admin.create({ name, email, password,phone_number });
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/get-admin", async (req, res) => {
  try {
    const admin = await Admin.findAll();
    res.status(200).json(admin);
  } catch (error) {
    console.log(error)
  }
})

// Role routes
app.post('/roles', async (req, res) => {
  try {
    const { role_name, description } = req.body;
    const role = await Role.create({ role_name, description });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Restaurant routes
app.post('/restaurants', async (req, res) => {
  try {
    const { name, location } = req.body;
    const restaurant = await Restaurant.create({ name, location });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Assign admin to a restaurant
app.post('/assign', async (req, res) => {
  try {
    const { admin_id, restaurant_id, role_id } = req.body;
    const assignment = await AdminRestaurantAssignment.create({ admin_id, restaurant_id, role_id });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sync database and start the server
sequelize.sync().then(() => {
  console.log("Database & tables created!");

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Error creating database tables:", error);
});
