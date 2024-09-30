const { Role, Manager, Menu, Topping, Restaurant, Order, Customer, OrderItem } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt-uitls");
const cloudinary = require("cloudinary").v2
const managerSignup = async (req, res) => {
  const {
    name,
    email,
    location,
    password,
    phone_number,
    roleName,
    restaurantName,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = await Role.findOne({
    where: { name: roleName },
  });

  if (!role) {
    return res.status(404).json({ message: "Role not found." });
  }

  const manager = {
    name,
    email,
    location,
    password: hashedPassword,
    phone_number,
    role_id: role.id,
    admin_id: req.user.id,
  };
  try {
    const response = await Manager.create(manager);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
};

const managerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const manager = await Manager.findOne({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    if (!manager) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, manager.password);
    if (!isValidPassword) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    if (manager.Role.name !== "manager") {
      return res
        .status(404)
        .json({ message: "Unauthorized, your not an manager" });
    }
    generateToken(res, manager.id);
    res.status(200).json({
      message: "login successfull",
      adminId: manager.id,
      name: manager.name,
      email: manager.email,
      role: manager.role,
    });
  } catch (error) {
    console.log("error logining", error);
  }
};

const addTopping = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { name } = req.body;

    const user = req.user; 
    // Check if the menu item exists
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Check if the manager has access to this restaurant's menu
    if (menu.manager_id !== user.id) {
      return res.status(403).json({
        message: "You are not authorized to add toppings for this menu.",
      });
    }
    // Create the topping
    const topping = await Topping.create({
      menu_id: menuId,
      name: name,
    });

    res.status(201).json({
      message: "Topping added successfully",
      topping,
    });
  } catch (error) {
    console.error("Error adding topping:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the topping" });
  }
};

const addMenu = async (req, res) => {
  const { name, price, image_url } = req.body;
  console.log("User in middleware:", req.user);

  try {
    const restaurant = await Restaurant.findOne({
      where: {
        managerId: req.user.id,
      },
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found for this manager" });
    }

    const newMenu = await Menu.create({
      name,
      price,
      image_url,
      restaurants_id: restaurant.id,
      manager_id: req.user.id,
    });
    res.status(201).json(newMenu);
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ message: "Error creating menu" });
  }
};


// get users order
const getCustomerOrder = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer, 
          attributes: ["id", "name", "email", "phone_number"], 
        },
        {
          model: Restaurant, 
          attributes: ["id", "name", "location"],
        },
        {
          model: OrderItem, 
          attributes: ["id", "quantity"],
          include: [
            {
              model: Menu,
              attributes: ["id", "name", "price"],
            },
            {
              model: Topping, 
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving orders." });
  }
};

const upload = async (req, res) => {
  try {
    const uploader = async (path) => {
      try {
        return await cloudinary.uploader.upload(path);
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
      }
    };
    const urls = [];

    for (const file of req.files) {
      const { path } = file;
      console.log("Uploading file:", path);
      const newPath = await uploader(path);
      urls.push(newPath);
    }

    res.status(200).json({ message: "success", data: urls });
    console.log(
      "Uploaded URLs:",
      urls.map((url) => url.secure_url)
    );
  } catch (error) {
    console.error("Error in upload controller:", error);
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.toString() });
  }
};


module.exports = {
  managerSignup,
  managerLogin,
  addMenu,
  addTopping,
  getCustomerOrder,
  upload,
};