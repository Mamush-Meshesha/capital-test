const bcrypt = require("bcrypt");
const { Customer, Topping, OrderItem, Menu,orderItemToping, Restaurant, Order, sequelize } = require("../models");
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
      name: customer.name,
      email: customer.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const customerOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { restaurantId, items } = req.body;
    const customerId = req.user.id;

    console.log(customerId);

    // Check if the restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId, { transaction });
    if (!restaurant) {
      await transaction.rollback();
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Create the order
    const order = await Order.create(
      {
        customer_id: customerId,
        restaurant_id: restaurantId,
        status: "Preparing",
      },
      { transaction }
    );

    const orderDetails = []; 

    // Create order items with toppings
    for (const item of items) {
      const menu = await Menu.findByPk(item.menuId, { transaction });
      if (!menu) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: `Menu item with id ${item.menuId} not found` });
      }

      // Create OrderItem
      const orderItem = await OrderItem.create(
        {
          order_id: order.id,
          menu_id: item.menuId,
          quantity: item.quantity,
        },
        { transaction }
      );

      // Add menu details to orderDetails
      orderDetails.push({
        menuId: menu.id,
        name: menu.name,
        price: menu.price, 
        quantity: item.quantity,
      });

      if (item.toppings && item.toppings.length > 0) {
        const toppings = await Topping.findAll({
          where: {
            name: item.toppings,
            menu_id: item.menuId, 
          },
          transaction,
        });

        if (toppings.length !== item.toppings.length) {
          await transaction.rollback();
          return res.status(404).json({
            message: `One or more toppings not found or not associated with the menu item`,
          });
        }

        // Associate the toppings with the order item
        await Promise.all(
          toppings.map((topping) =>
            orderItemToping.create(
              {
                order_item_id: orderItem.id,
                topping_id: topping.id,
              },
              { transaction }
            )
          )
        );
      }
    }

    await transaction.commit();

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: order.id,
      orderDetails,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while placing the order" });
  }
};

const fetchOrderEnum = async (req, res) => {
  const orederStatus = ["Preparing", "Ready", "Delivered"];
    return res.status(200).json({ status: orederStatus });

}

const updateOrderStatus = async (req, res) => {
  
  const { orderId } = req.params
  const { status } = req.body
  
  try {
    const order = await Order.findByPk(orderId)
    
    if (!order) {
      return res.status(404).json({message: "order not found"})
    }
    const validStatus = ["Preparing", "Ready", "Delivered"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({message: "invalid status"})
    }

    order.status = status
    await order.save()

    return res.status(200).json({
      message: "Order status updated successfully",
      orderId: order.id,
      newStatus: order.status,
    });
  } catch (error) {
        return res
          .status(500)
          .json({
            message: "An error occurred while updating the order status",
          });

  }
}

const Logout = async (req, res) => {
 try {
   jwtUtil.clearToken(res);
   logger.info({ userId: req.token_data?.id }, "User logged out successfully");
   res.status(200).json({ message: "Logged out successfully" });
 } catch (error) {
   logger.error({ error }, "Error during logout");
   res.status(500).json({ message: "Error logging out" });
 }
};

module.exports = {
    customerSignup,
    customerLogin,
  customerOrder,
  fetchOrderEnum,
  updateOrderStatus,
    Logout
}