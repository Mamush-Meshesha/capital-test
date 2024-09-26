module.exports = (sequelize, DataTypes) => {
  const Topping = sequelize.define(
    "Topping",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "menus",
          key: "id",
        },
      },
      name: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "toppings",
    }
  );

  Topping.associate = (models) => {
    Topping.belongsTo(models.Menu, { foreignKey: "menu_id" });
  };

  return Topping;
};
