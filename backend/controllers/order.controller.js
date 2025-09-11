const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerId, restaurantId, items, totalAmount, paymentIntentId } = req.body;

    if (!customerId || !restaurantId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer ID, restaurant ID, and items are required"
      });
    }

    // Verify customer exists
    const customer = await prisma.user.findUnique({
      where: { id: customerId }
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found"
      });
    }

    // Verify restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    // Create order with items and toppings
    const order = await prisma.order.create({
      data: {
        customer_id: customerId,
        restaurant_id: restaurantId,
        status: "PREPARING",
        orderItems: {
          create: items.map(item => ({
            menu_id: item.menuId,
            quantity: item.quantity,
            orderItemToppings: {
              create: (item.toppings || []).map(topping => ({
                topping_id: topping.id
              }))
            }
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            menu: true,
            orderItemToppings: {
              include: {
                topping: true
              }
            }
          }
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true
          }
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            location: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: order
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get orders for a customer
const getCustomerOrders = async (req, res) => {
  try {
    const { customerId } = req.params;

    const orders = await prisma.order.findMany({
      where: { customer_id: parseInt(customerId) },
      include: {
        orderItems: {
          include: {
            menu: true,
            orderItemToppings: {
              include: {
                topping: true
              }
            }
          }
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            location: true
          }
        }
      },
      orderBy: { created_at: "desc" }
    });

    res.status(200).json({
      success: true,
      orders: orders
    });

  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get all orders (for admin/manager)
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            menu: true,
            orderItemToppings: {
              include: {
                topping: true
              }
            }
          }
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true
          }
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            location: true
          }
        }
      },
      orderBy: { created_at: "desc" }
    });

    res.status(200).json({
      success: true,
      orders: orders
    });

  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["PREPARING", "READY", "DELIVERED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be PREPARING, READY, or DELIVERED"
      });
    }

    const order = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status },
      include: {
        orderItems: {
          include: {
            menu: true,
            orderItemToppings: {
              include: {
                topping: true
              }
            }
          }
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true
          }
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            location: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: order
    });

  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getCustomerOrders,
  getAllOrders,
  updateOrderStatus
};

