const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "customers",
          key: "id",
        },
        allowNull: false,
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "restaurants",
          key: "id",
        },
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Preparing", "Ready", "Delivered"),
        allowNull: false,
        defaultValue: "Preparing",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "orders",
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, { foreignKey: "customer_id" });
    Order.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });

    Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
  };

  return Order;
};
