module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [
          "update order status",
          "see customers",
          "see orders",
          "add user",
          "create role",
        ],
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "role_permission",
    }
  );

  RolePermission.associate = (models) => {
    RolePermission.belongsTo(models.Role, { foreignKey: "role_id" });
  };

  return RolePermission;
};
