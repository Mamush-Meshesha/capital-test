const bcrypt = require("bcrypt");
const { Customer, Topping, OrderItem, Menu, Restaurant, Order, sequelize } = require("../models");
const { protectCustomer } = require("../middlewares/authMiddleware");
const { generateToken } = require("../utils/jwt-uitls");

const customerSignup = async (req, res) => {
  try {
    const { name, email, password, phone_number, location } = req.body;
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res
        .status(403)
        .json({ message: "User by this email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      location,
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({
      where: { email },
    });
    if (!customer) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, customer.password);
    if (!isValidPassword) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    generateToken(res, customer.id);
    res.status(200).json({
      message: "login successfull",
      customerId: customer.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const customerOrder = async (req, res) => {
  try {
    const { restaurantId, items } = req.body;
    const customerId = req.user.id;

    // Check if the restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Create the order
    const order = await Order.create({
      customer_id: customerId,
      restaurant_id: restaurantId,
      status: "Pending",
    });

    // Create order items with toppings
    for (const item of items) {
      const menu = await Menu.findByPk(item.menuId);
      if (!menu) {
        // If a menu item is not found, delete the created order and return an error
        await order.destroy();
        return res
          .status(404)
          .json({ message: `Menu item with id ${item.menuId} not found` });
      }

      // Create OrderItem
      const orderItem = await OrderItem.create({
        order_id: order.id,
        menu_id: item.menuId,
        quantity: item.quantity,
      });

      // If toppings are provided, associate them with the OrderItem
      if (item.toppings && item.toppings.length > 0) {
        const toppings = await Topping.findAll({
          where: {
            id: item.toppings,
            menu_id: item.menuId, // Ensure toppings belong to the correct menu item
          },
        });

        if (toppings.length !== item.toppings.length) {
          // If not all toppings are found, delete the created order and return an error
          await order.destroy();
          return res.status(404).json({
            message: `One or more toppings not found or not associated with the menu item`,
          });
        }

        // Associate the toppings with the order item
        await orderItem.addToppings(toppings);
      }
    }

    // Fetch the complete order with items and toppings
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Menu,
              attributes: ["name", "price"],
            },
            {
              model: Topping,
              attributes: ["name", "price"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: completeOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while placing the order" });
  }
};
module.exports = {
    customerSignup,
    customerLogin,
    customerOrder
}