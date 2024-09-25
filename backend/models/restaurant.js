// // models/restaurant.js
// import { Model, DataTypes } from "sequelize";

// export default (sequelize) => {
//   class Restaurant extends Model {
//     static associate(models) {
//       Restaurant.hasMany(models.User, {
//         as: "managers",
//         foreignKey: "restaurantId",
//       });
//     }
//   }

//   Restaurant.init(
//     {
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       address: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       // Add other restaurant-related fields
//     },
//     {
//       sequelize,
//       modelName: "Restaurant",
//     }
//   );

//   return Restaurant;
// };


const { DataTypes } = require('sequelize');
const sequelize = require('../config/index.js');

// Define Restaurant model
const Restaurant = sequelize.define('Restaurant', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
}, {
  timestamps: true,
});

module.exports = Restaurant;
