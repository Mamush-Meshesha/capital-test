// manager.model.js
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define(
    "Manager",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "admins",
          key: "id",
        },
      },
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      phone_number: DataTypes.INTEGER,
      restaurant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "restaurants",
          key: "id",
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "managers",
    }
  );

  Manager.associate = (models) => {
    Manager.belongsTo(models.Admin, { foreignKey: "admin_id" });
    Manager.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
    Manager.belongsTo(models.Role, { foreignKey: "role_id" });
  };

  return Manager;
};
