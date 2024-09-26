// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// let jss = {};

// export async function registerjss(sequelize) {
//   const thisFile = path.basename(__filename);
//   const jsFiles = fs.readdirSync(__dirname);
//   const filteredjsFiles = jsFiles.filter(
//     (file) => file !== thisFile && file.slice(-3) === ".js"
//   );

//   // First, import all jss
//   for (const file of filteredjsFiles) {
//     try {
//       const module = await import(path.join(__dirname, file));
//       const js = module.default(sequelize);
//       jss[js.name] = js;
//     } catch (err) {
//       console.error(`Error loading js ${file}:`, err);
//     }
//   }

//   // Then, call associate function for each js
//   Object.values(jss).forEach((js) => {
//     if (js.associate) {
//       js.associate(jss);
//     }
//   });

//   jss.sequelize = sequelize;
//   return jss;
// }


// const sequelize = require('../config/index.js');
// const Admin = require('./admin.js');
// const Customer = require('./customer.js');
// const Role = require('./role');
// const Restaurant = require('./restaurant');
// const AdminRestaurantAssignment = require('./adminRestaurantAssignment');

// // Define Relationships
// Admin.belongsTo(Role, { foreignKey: 'role_id' });
// Admin.belongsToMany(Restaurant, { through: AdminRestaurantAssignment });
// Restaurant.belongsToMany(Admin, { through: AdminRestaurantAssignment });

// module.exports = {
//   sequelize,
//   Admin,
//   Customer,
//   Role,
//   Restaurant,
//   AdminRestaurantAssignment
// };


// index.js
const {  DataTypes } = require('sequelize');
const sequelize = require("../config/index.js");

const Admin = require('./admin.js')(sequelize, DataTypes);
const Role = require('./role.js')(sequelize, DataTypes);
const RolePermission = require('./rolePermissions.js')(sequelize, DataTypes);
const Manager = require('./manager.js')(sequelize, DataTypes);
const Customer = require('./customer.js')(sequelize, DataTypes);
const Restaurant = require('./restaurant.js')(sequelize, DataTypes);
const Menu = require('./menu.js')(sequelize, DataTypes);
const Topping = require('./topping.js')(sequelize, DataTypes);
const Order = require('./order.js')(sequelize, DataTypes);
const OrderItem = require('./orderItem.js')(sequelize, DataTypes);

// Associations
Role.hasMany(RolePermission, { foreignKey: 'role_id' });
RolePermission.belongsTo(Role, { foreignKey: 'role_id' });

Admin.hasMany(Manager, { foreignKey: 'admin_id' });
Manager.belongsTo(Admin, { foreignKey: 'admin_id' });

Restaurant.hasMany(Manager, { foreignKey: 'restaurant_id' });
Manager.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

Role.hasMany(Manager, { foreignKey: 'role_id' });
Manager.belongsTo(Role, { foreignKey: 'role_id' });

Role.hasMany(Customer, { foreignKey: 'role_id' });
Customer.belongsTo(Role, { foreignKey: 'role_id' });

Admin.hasMany(Restaurant, { foreignKey: 'admin_id' });
Restaurant.belongsTo(Admin, { foreignKey: 'admin_id' });

Restaurant.hasMany(Menu, { foreignKey: 'restaurants_id' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurants_id' });

Menu.hasMany(Topping, { foreignKey: 'menu_id' });
Topping.belongsTo(Menu, { foreignKey: 'menu_id' });

Customer.hasMany(Order, { foreignKey: 'customer_id' });
Order.belongsTo(Customer, { foreignKey: 'customer_id' });

Restaurant.hasMany(Order, { foreignKey: 'restaurant_id' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Menu.hasMany(OrderItem, { foreignKey: 'menu_id' });
OrderItem.belongsTo(Menu, { foreignKey: 'menu_id' });

module.exports = {
    sequelize,
    Admin,
    Role,
    RolePermission,
    Manager,
    Customer,
    Restaurant,
    Menu,
    Topping,
    Order,
    OrderItem   
}