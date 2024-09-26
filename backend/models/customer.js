// import { Model, DataTypes } from "sequelize";
// import bcrypt from "bcrypt";

// export default (sequelize) => {
//   class User extends Model {
//     static associate(models) {
//       // Many-to-many relationship for roles (for flexibility)
//     //   User.belongsToMany(models["Role"], { through: models.UserRole });

//     //   // If a user is a manager, they manage one or more restaurants
//     //   User.belongsTo(models["Restaurant"], {
//     //     as: "managedRestaurant",
//     //     foreignKey: "restaurantId",
//     //   });

//       // Customers can have many orders
//         // User.hasMany(models["Order"], { as: "orders" });
//         // User.hasOne(models["RefreshToken"])

//           //  User.belongsTo(models.Restaurant, {
//           //    as: "managedRestaurant",
//           //    foreignKey: "restaurantId",
//           //  });

//           //  // User has one UserRole
//           //  User.belongsTo(models.UserRole, {
//           //    foreignKey: "roleId",
//           //    as: "role",
//       //  });
//         User.belongsTo(models.Restaurant, {
//         as: "managedRestaurant",
//         foreignKey: "restaurantId",
//       });
//     }

    
      

//     static async hashPassword(password) {
//       const salt = await bcrypt.genSalt(10);
//       return await bcrypt.hash(password, salt);
//     }

//     static async comparePasswords(password, hashedPassword) {
//       return await bcrypt.compare(password, hashedPassword);
//     }
//   }

//   User.init(
//     {
//       email: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: true,
//         },
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       location: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       phone: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
 

//       // Differentiates between customer and admin
//       // userType: {
//       //   type: DataTypes.ENUM("customer", "admin"),
//       //   allowNull: false,
//       //   defaultValue: "customer",
//       // },
//       // Further specifies the admin role, if userType is 'admin'
//       // adminRole: {
//       //   type: DataTypes.ENUM(
//       //     "superAdmin",
//       //     "restaurantManager",
//       //     "kitchenManager",
//       //     "deliveryPersonnel"
//       //   ),
//       // //   allowNull: true, // Only relevant for admin users
//       // },
//     },
//     {
//       sequelize,
//       modelName: "User",
//       indexes: [{ unique: true, fields: ["email"] }],
//     }
//   );

//   // Hash password before saving user to the database
//   User.beforeSave(async (user, options) => {
//     if (user.password) {
//       const hashedPassword = await User.hashPassword(user.password);
//       user.password = hashedPassword;
//     }
//   });

//   return User;
// };


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/index.js');

// // Define Customer model
// const Customer = sequelize.define('Customer', {
//   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, unique: true, allowNull: false },
//   password: { type: DataTypes.STRING, allowNull: false },
//   phone_number: { type: DataTypes.STRING },
// }, {
//   timestamps: true,
// });

// module.exports = Customer;


module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      location: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.INTEGER,
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
      tableName: "customers",
    }
  );

  Customer.associate = (models) => {
    Customer.belongsTo(models.Role, { foreignKey: "role_id" });
  };

  return Customer;
};
