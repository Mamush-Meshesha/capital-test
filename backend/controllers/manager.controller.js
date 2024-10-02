const { Role, Manager, Menu, Topping, Restaurant, Order, Customer, OrderItem } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt-uitls");
const { default: axios } = require("axios");
const { defineAbilitiesFor } = require("../utils/permissions");
const managerSignup = async (req, res) => {
  const {
    name,
    email,
    location,
    password,
    phone_number,
    roleName,
  } = req.body;

  const ability = defineAbilitiesFor(req.user);

  if (ability.cannot("register", "Manager")) {
    return res
      .status(403)
      .json({ message: "You do not have permission to register a manager" });
  }

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
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (menu.manager_id !== user.id) {
      return res.status(403).json({
        message: "You are not authorized to add toppings for this menu.",
      });
    }
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
  const { name, price, image_url, toppings } = req.body; 
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

    if (toppings && Array.isArray(toppings)) {
      const toppingsPromises = toppings.map((topping) =>
        Topping.create({
          menu_id: newMenu.id,
          name: topping,
        })
      );

      await Promise.all(toppingsPromises);
    }

    res.status(201).json({
      message: "Menu and toppings created successfully",
      menu: newMenu,
      toppings: toppings || [], 
    });
  } catch (error) {
    console.error("Error creating menu and toppings:", error);
    res.status(500).json({ message: "Error creating menu and toppings" });
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
              attributes: ["id", "name", "price", "image_url"],
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

const uploadToImgur = async (imageBuffer) => {
  const response = await axios.post(
    "https://api.imgur.com/3/image",
    imageBuffer,
    {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data.link; 
};

const uploadImage = async (req, res) => {
  try {
    const imageBuffer = {
      image: req.file.buffer.toString("base64"), 
    };

    const imgurUrl = await uploadToImgur(imageBuffer);
    res.status(200).json({ message: "Upload successful", data: imgurUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

module.exports = {
  managerSignup,
  managerLogin,
  addMenu,
  addTopping,
  getCustomerOrder,
  uploadImage,
};