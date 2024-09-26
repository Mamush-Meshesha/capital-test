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
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "restaurants",
          key: "id",
        },
      },
      status: DataTypes.STRING,
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
  };

  return Order;
};
