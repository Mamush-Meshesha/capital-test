module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
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
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "roles",
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.Manager, { foreignKey: "role_id", });
     Role.hasMany(models.RolePermission, {
       foreignKey: "role_id",
       as: "permissions",
     });
  };

  return Role;
};
