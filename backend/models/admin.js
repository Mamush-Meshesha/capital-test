// import { Model, DataTypes } from "sequelize"
// import bcrypt from "bcrypt"

// export default (sequelize) => {
//     class Admin extends Model {
//         static associate(models) {
//           Admin.hasMany(models.Restaurant, {
//             foreignKey: "adminId", // Restaurant table will have an `adminId` field for the Super Admin
//             as: "restaurants", // Optional alias
//             scope: { roleId: 1 }, // Assuming roleId = 1 is for Super Admin
//           });
//              Admin.belongsTo(models.Restaurant, {
//                foreignKey: "restaurantId", // Admin table will have a `restaurantId` field for the specific restaurant they manage
//                as: "restaurant", // Optional alias
//                scope: { roleId: 2 }, // Assuming roleId = 2 is for Manager/Admin
//              });

//              // Admin has a Role (Super Admin, Manager, etc.)
//              Admin.belongsTo(models.Role, {
//                foreignKey: "roleId",
//                as: "role", // Optional alias
//              });
//         }
// static async hashPassword(password) {
//       const salt = await bcrypt.genSalt(10);
//       return await bcrypt.hash(password, salt);
//     }

//     static async comparePasswords(password, hashedPassword) {
//       return await bcrypt.compare(password, hashedPassword);
//     }

//     }
//     Admin.init({
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true
//             }
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         location: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         restorantName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         adminName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         image: {
//             type: DataTypes.STRING,
//             allowNull: true
//         }
//     }, {
//         sequelize,
//         modelName: 'Admin',
//         timestamps: true,
//         indexes: [{unique: true, fields: ["email"]}]
//     })
//     Admin.beforeSave(async (admin, options) => {
//         if (admin.password) {
//             const hashedPassword = await Admin.hashPassword(admin.password)
//             admin.password = hashedPassword
//         }
//     })

//     return Admin
// }

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/index.js'); // Import the database connection

// // Define Admin model
// const Admin = sequelize.define('Admin', {
//   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, unique: true, allowNull: false },
//   password: { type: DataTypes.STRING, allowNull: false },
//   role_id: { type: DataTypes.UUID, allowNull: false },
// }, {
//   timestamps: true,
// });

// module.exports = Admin;

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
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
      image_url: {
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
      tableName: "admins",
    }
  );

  return Admin;
};
