const bcrypt = require("bcrypt")
const { Admin, Manager, Restaurant, Role, Customer } = require("../models");
const { generateToken } = require("../utils/jwt-uitls");


const adminSignUp = async (req, res) => {
  const { name, email, password, phone_number } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
    });
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    if (admin.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not an admin , back-off" });
    }

    generateToken(res, admin.id);
    res.status(200).json({
      message: "Login successful",
      adminId: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
    console.log(token);
  } catch (error) {
    console.log(`error occure during login ${error}`);
  }
};

const adminLogout = async (req, res) => {
  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({message: "Seccessfully logged out"})
}

// roles

const Roles =   async (req, res) => {
  console.log("Request Body:", req.body);

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required." });
  }

  try {
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
}

const Restaurants = async (req, res) => {
  try {
    const { name, location, managerName } = req.body;
    const manager = await Manager.findOne({ where: { name: managerName } });

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    const restaurant = await Restaurant.create({
      name,
      location,
      admin_id: req.user.id,
      managerId: manager.id,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          model: Manager,
          attributes: ["name"],
        },
        {
          
        }
      ],
    });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get roles

const getRoles = async (req, res) => {
  
  try {
    const roles = await Role.findAll({})
    res.status(200).json(roles);
  } catch (error) {
    console.log(error)
  }
}

const getUsers = async (req, res) => {
  try {
    const customers = await Customer.findAll({})
    res.status(200).json(customers)
  } catch (error) {
    console.log(error.message)
  }
}
const getManager = async (req, res) => {
  try {
    const managers = await Manager.findAll({
      include: [
        {
          model: Restaurant,
          attributes: ["name", "location"],
        },
        {
          model: Role,
          attributes: ["name"],
      }
      ]
    })
    res.status(200).json(managers)
  } catch (error) {
    console.log(error)
  }
}

// const getRestaurants = async(req, res) => {
//   try {
//     const restaurant = await Restaurant.findAll({
//       include: [
//         {
//           model: Manager,
//           attributes: ["name"],
//         },
      
//       ]
//     })
//   } catch (error) {
    
//   }
// }
module.exports = {
    adminSignUp,
    adminLogin,
    Roles,
    Restaurants,
  getRestaurants,
  adminLogout,
  getRoles,
  getUsers,
  getManager,
    getRestaurants
}