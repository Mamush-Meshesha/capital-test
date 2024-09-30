module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "Restaurant",
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
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "admins",
          key: "id",
        },
        allowNull: false,
      },
      managerId: {
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
      tableName: "restaurants",
    }
  );

  Restaurant.associate = (models) => {
    Restaurant.belongsTo(models.Admin, { foreignKey: "admin_id" });
    Restaurant.belongsTo(models.Manager, { foreignKey: "managerId" });
  };

  return Restaurant;
};
