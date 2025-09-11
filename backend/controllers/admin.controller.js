const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const { generateToken } = require("../utils/jwt-uitls");

const adminSignUp = async (req, res) => {
  const { name, email, password, phone_number } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number,
      },
    });
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    if (admin.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not an admin , back-off" });
    }

    generateToken(res, admin.id, "admin");
    res.status(200).json({
      message: "Login successful",
      adminId: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.log(`error occure during login ${error}`);
  }
};

const adminLogout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Seccessfully logged out" });
};

// roles

const Roles = async (req, res) => {
  console.log("Request Body:", req.body);

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required." });
  }

  try {
    const role = await prisma.role.create({ data: { name } });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

const Restaurants = async (req, res) => {
  try {
    const { name, location, managerName } = req.body;
    const manager = await prisma.manager.findFirst({
      where: { name: managerName },
    });

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        location,
        admin_id: req.user.id,
        managerId: manager.id,
      },
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        manager: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRoleWithPermissions = async (req, res) => {
  const { roleName, permissions } = req.body;

  if (!roleName || !permissions || !Array.isArray(permissions)) {
    return res.status(400).json({
      message: "Role name and permissions (as an array) are required.",
    });
  }

  try {
    const newRole = await prisma.role.create({
      data: {
        name: roleName,
      },
    });

    const rolePermissions = await prisma.rolePermission.create({
      data: {
        role_id: newRole.id,
        permissions: permissions,
      },
    });

    return res.status(201).json({
      message: "Role and permissions created successfully.",
      role: newRole,
      permissions: rolePermissions,
    });
  } catch (error) {
    console.error("Error creating role with permissions:", error);
    return res.status(500).json({
      message: "An error occurred while creating the role and permissions.",
      error: error.message,
    });
  }
};

//get roles

const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        role_permissions: {
          select: {
            permissions: true,
          },
        },
      },
    });
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
  }
};

const getPermission = async (req, res) => {
  try {
    const defaultPermissions = [
      "update order status",
      "see customers",
      "see orders",
      "add user",
      "create role",
    ];
    res.status(200).json(defaultPermissions);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching default permissions" });
  }
};

const getUsers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({});
    res.status(200).json(customers);
  } catch (error) {
    console.log(error.message);
  }
};
const getManager = async (req, res) => {
  try {
    const managers = await prisma.user.findMany({
      where: { role: "MANAGER" },
      include: {
        managedRestaurants: {
          select: {
            name: true,
            location: true,
          },
        },
      },
    });
    res.status(200).json(managers);
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: {
          select: {
            name: true,
            phone_number: true,
          },
        },
        orderItems: {
          include: {
            orderItemToppings: {
              include: {
                topping: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  adminSignUp,
  adminLogin,
  Roles,
  Restaurants,
  getRestaurants,
  adminLogout,
  getRoles,
  getUsers,
  getManager,
  getRestaurants,
  getPermission,
  createRoleWithPermissions,
  getOrders,
};
