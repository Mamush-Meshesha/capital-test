module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
        allowNull: false,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "menus",
          key: "id",
        },
        allowNull: false,
      },
      quantity: {
       type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "order_items",
    }
  );

  OrderItem.associate = (models) => {
   OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
   OrderItem.belongsTo(models.Menu, { foreignKey: "menu_id" });
  OrderItem.belongsToMany(models.Topping, {
    through: models.OrderItemTopping,
    foreignKey: "order_item_id",
  });
  };

  return OrderItem;
};
