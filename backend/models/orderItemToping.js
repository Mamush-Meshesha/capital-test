module.exports = (sequelize, DataTypes) => {
  const OrderItemTopping = sequelize.define(
    "OrderItemTopping",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "order_items",
          key: "id",
        },
        allowNull: false,
      },
      topping_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "toppings",
          key: "id",
        },
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "order_item_toppings",
    }
  );

  OrderItemTopping.associate = (models) => {
    OrderItemTopping.belongsTo(models.OrderItem, {
      foreignKey: "order_item_id",
    });
    OrderItemTopping.belongsTo(models.Topping, { foreignKey: "topping_id" });
  };

  return OrderItemTopping;
};
