module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      restaurants_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "restaurants",
          key: "id",
        },
        allowNull: false,
      },
      manager_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "managers",
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
      tableName: "menus",
    }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.Restaurant, { foreignKey: "restaurants_id" });
    Menu.belongsTo(models.Manager, { foreignKey: "manager_id" }); // Optional association
 
 Menu.hasMany(models.Topping, { foreignKey: "menu_id" }); 
  };

  return Menu;
};
