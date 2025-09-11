const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const { generateToken } = require("../utils/jwt-uitls");

const customerSignup = async (req, res) => {
  try {
    const { name, email, password, phone_number, location } = req.body;
    const existingCustomer = await prisma.customer.findUnique({
      where: { email },
    });
    if (existingCustomer) {
      return res
        .status(403)
        .json({ message: "User by this email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const parsedPhoneNumber = Number.parseInt(phone_number, 10);
    if (Number.isNaN(parsedPhoneNumber)) {
      return res.status(400).json({ error: "phone_number must be a number" });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number: parsedPhoneNumber,
        location,
      },
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const customerLogin = async (req, res) => {
  const { email, password } = req.body || {};

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, customer.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    generateToken(res, customer.id, "customer");
    return res.status(200).json({
      message: "login successful",
      customerId: customer.id,
      name: customer.name,
      email: customer.email,
      role: "customer",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const customerOrder = async (req, res) => {
  try {
    const { restaurantId, items } = req.body;
    const customerId = req.user.id;

    console.log(customerId);

    // Use Prisma transaction
    const result = await prisma.$transaction(async (tx) => {
      // Check if the restaurant exists
      const restaurant = await tx.restaurant.findUnique({
        where: { id: restaurantId },
      });
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      // Create the order
      const order = await tx.order.create({
        data: {
          customer_id: customerId,
          restaurant_id: restaurantId,
          status: "PREPARING",
        },
      });

      const orderDetails = [];

      // Create order items with toppings
      for (const item of items) {
        const menu = await tx.menu.findUnique({
          where: { id: item.menuId },
        });
        if (!menu) {
          throw new Error(`Menu item with id ${item.menuId} not found`);
        }

        // Create OrderItem
        const orderItem = await tx.orderItem.create({
          data: {
            order_id: order.id,
            menu_id: item.menuId,
            quantity: item.quantity,
          },
        });

        // Add menu details to orderDetails
        orderDetails.push({
          menuId: menu.id,
          name: menu.name,
          price: menu.price,
          quantity: item.quantity,
        });

        if (item.toppings && item.toppings.length > 0) {
          const toppings = await tx.topping.findMany({
            where: {
              name: { in: item.toppings },
              menu_id: item.menuId,
            },
          });

          if (toppings.length !== item.toppings.length) {
            throw new Error(
              "One or more toppings not found or not associated with the menu item"
            );
          }

          // Associate the toppings with the order item
          await Promise.all(
            toppings.map((topping) =>
              tx.orderItemTopping.create({
                data: {
                  order_item_id: orderItem.id,
                  topping_id: topping.id,
                },
              })
            )
          );
        }
      }

      return { order, orderDetails };
    });

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: result.order.id,
      orderDetails: result.orderDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "An error occurred while placing the order",
    });
  }
};

const fetchOrderEnum = async (req, res) => {
  const orederStatus = ["Preparing", "Ready", "Delivered"];
  return res.status(200).json({ status: orederStatus });
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    const validStatus = ["PREPARING", "READY", "DELIVERED"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "invalid status" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status: status },
    });

    return res.status(200).json({
      message: "Order status updated successfully",
      orderId: updatedOrder.id,
      newStatus: updatedOrder.status,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the order status",
    });
  }
};

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
  Logout,
};
