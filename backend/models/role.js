// // model/userRole.js
// import { Model, DataTypes } from "sequelize";

// export default (sequelize) => {
//   class UserRole extends Model {}

//   UserRole.init(
//     {
//       userId: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: "Users",
//           key: "id",
//         },
//       },
//       roleId: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: "Roles",
//           key: "id",
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "UserRole",
//     }
//   );

//   return UserRole;
// };


const { DataTypes } = require('sequelize');
const sequelize = require('../config/index.js');

// Define Role model
const Role = sequelize.define('Role', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  role_name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
}, {
  timestamps: true,
});

module.exports = Role;
