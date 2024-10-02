"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove existing columns
    await queryInterface.removeColumn("role_permission", "recource");
    await queryInterface.removeColumn("role_permission", "action");

    // Add new permissions column
    await queryInterface.addColumn("role_permission", "permissions", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: [
        "update order status",
        "see customers",
        "see orders",
        "add user",
        "create role",
      ],
    });

    // Update existing records
    await queryInterface.sequelize.query(`
      UPDATE role_permission 
      SET permissions = ARRAY['update order status', 'see customers', 'see orders', 'add user', 'create role']
      WHERE permissions IS NULL;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the new permissions column
    await queryInterface.removeColumn("role_permission", "permissions");

    // Add back the original columns
    await queryInterface.addColumn("role_permission", "recource", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("role_permission", "action", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
