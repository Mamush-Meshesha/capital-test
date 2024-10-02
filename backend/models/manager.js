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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // restaurant_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "restaurants",
      //     key: "id",
      //   },
      //   allowNull: false,
      // },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
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
      tableName: "managers",
    }
  );

  Manager.associate = (models) => {
    Manager.belongsTo(models.Admin, { foreignKey: "admin_id" });
    Manager.belongsTo(models.Role, { foreignKey: "role_id" });
    Manager.hasMany(models.Menu, { foreignKey: "manager_id" });
  };

  return Manager;
};
