const prisma = require("../lib/prisma");

const getPizza = async (req, res) => {
  try {
    const pizza = await prisma.menu.findMany({
      include: {
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
        restaurant: {
          select: {
            name: true,
          },
        },
        toppings: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(pizza);
  } catch (error) {
    console.log(error);
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({});
    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error.message);
  }
};

const getCustomerOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            quantity: true,
            menu: {
              select: {
                id: true,
                name: true,
                price: true,
                image_url: true,
              },
            },
            orderItemToppings: {
              select: {
                topping: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving orders." });
  }
};

module.exports = { getPizza, getRestaurants, getCustomerOrder };
