const {  DataTypes } = require('sequelize');
const sequelize = require("../config/index.js");
const orderItemToping = require("./orderItemToping.js")(sequelize, DataTypes);

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

Manager.hasMany(Menu, { foreignKey: "manager_id" });
Menu.belongsTo(Manager, { foreignKey: "manager_id" });


OrderItem.belongsToMany(Topping, {
  through: orderItemToping,
  foreignKey: "order_item_id",
});
Topping.belongsToMany(OrderItem, {
  through: orderItemToping,
  foreignKey: "topping_id",
});

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
    OrderItem,
    orderItemToping
}