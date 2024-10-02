const { Manager, Menu, Restaurant, Topping, Order, Customer, OrderItem } =require("../models")

const getPizza = async (req, res) => {
    try {
        const pizza = await Menu.findAll({
            include: [
                {
                    model: Manager,
                    attributes: ["id","name"],
                },
                {
                    model: Restaurant,
                    attributes: ["name"]
                },
                {
                    model: Topping,
                    attributes: ["name"]
                }
            ]
        })
        res.status(200).json(pizza)
    } catch (error) {
        console.log(error)
    }
}

const getRestaurants = async (req, res) => {
    
    try {
        const restaurants = await Restaurant.findAll({})
        res.status(200).json(restaurants)
    } catch (error) {
        console.log(error.message)
    }
} 

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

module.exports ={getPizza, getRestaurants, getCustomerOrder}