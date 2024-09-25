// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// let models = {};

// export async function registerModels(sequelize) {
//   const thisFile = path.basename(__filename);
//   const modelFiles = fs.readdirSync(__dirname);
//   const filteredModelFiles = modelFiles.filter(
//     (file) => file !== thisFile && file.slice(-3) === ".js"
//   );

//   // First, import all models
//   for (const file of filteredModelFiles) {
//     try {
//       const module = await import(path.join(__dirname, file));
//       const model = module.default(sequelize);
//       models[model.name] = model;
//     } catch (err) {
//       console.error(`Error loading model ${file}:`, err);
//     }
//   }

//   // Then, call associate function for each model
//   Object.values(models).forEach((model) => {
//     if (model.associate) {
//       model.associate(models);
//     }
//   });

//   models.sequelize = sequelize;
//   return models;
// }


const sequelize = require('../config/index.js');
const Admin = require('./admin.js');
const Customer = require('./customer.js');
const Role = require('./role');
const Restaurant = require('./restaurant');
const AdminRestaurantAssignment = require('./adminRestaurantAssignment');

// Define Relationships
Admin.belongsTo(Role, { foreignKey: 'role_id' });
Admin.belongsToMany(Restaurant, { through: AdminRestaurantAssignment });
Restaurant.belongsToMany(Admin, { through: AdminRestaurantAssignment });

module.exports = {
  sequelize,
  Admin,
  Customer,
  Role,
  Restaurant,
  AdminRestaurantAssignment
};
