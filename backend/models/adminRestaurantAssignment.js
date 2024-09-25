const { DataTypes } = require('sequelize');
const sequelize = require('../config/index.js');

// Define AdminRestaurantAssignment model
const AdminRestaurantAssignment = sequelize.define('AdminRestaurantAssignment', {
  admin_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Admins', key: 'id' }},
  restaurant_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Restaurants', key: 'id' }},
  role_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Roles', key: 'id' }},
  assigned_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: true,
});

module.exports = AdminRestaurantAssignment;
