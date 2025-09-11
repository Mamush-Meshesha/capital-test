const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding database...");

    const passwordHash = bcrypt.hashSync("password123", 10);

    // Roles
    const adminRole = await prisma.role.upsert({
      where: { id: 1000 },
      update: { name: "admin" },
      create: {
        name: "admin",
        role_permissions: {
          create: {
            permissions: [
              "create role",
              "see customers",
              "see orders",
              "add user",
              "register manager",
              "register restaurant",
            ],
          },
        },
      },
      include: { role_permissions: true },
    });

    const managerRole = await prisma.role.upsert({
      where: { id: 1001 },
      update: { name: "manager" },
      create: {
        name: "manager",
        role_permissions: {
          create: {
            permissions: ["update order status", "see customers", "see orders"],
          },
        },
      },
      include: { role_permissions: true },
    });

    const customerRole = await prisma.role.upsert({
      where: { id: 1002 },
      update: { name: "customer" },
      create: {
        name: "customer",
        role_permissions: {
          create: {
            permissions: ["create order", "see order"],
          },
        },
      },
      include: { role_permissions: true },
    });

    // Admin User
    const admin = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        name: "Admin User",
        email: "admin@example.com",
        password: passwordHash,
        phone_number: "1234567890",
        role: "ADMIN",
      },
    });

    // Manager User
    const manager = await prisma.user.upsert({
      where: { email: "manager@example.com" },
      update: {},
      create: {
        name: "Manager One",
        location: "Downtown",
        email: "manager@example.com",
        password: passwordHash,
        phone_number: "987654321",
        role: "MANAGER",
      },
    });

    // Customer User
    const customer = await prisma.user.upsert({
      where: { email: "customer@example.com" },
      update: {},
      create: {
        name: "Customer One",
        email: "customer@example.com",
        password: passwordHash,
        phone_number: "5555555555",
        location: "Suburbs",
        role: "CUSTOMER",
      },
    });

    // Restaurant
    const restaurant = await prisma.restaurant.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Capital Pizza",
        location: "City Center",
        admin_id: admin.id,
        managerId: manager.id,
      },
    });

    // Menus
    const margherita = await prisma.menu.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Margherita",
        price: 12,
        image_url: null,
        restaurants_id: restaurant.id,
        manager_id: manager.id,
        toppings: {
          create: [{ name: "Basil" }, { name: "Mozzarella" }],
        },
      },
      include: { toppings: true },
    });

    const pepperoni = await prisma.menu.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: "Pepperoni",
        price: 15,
        image_url: null,
        restaurants_id: restaurant.id,
        manager_id: manager.id,
        toppings: {
          create: [{ name: "Pepperoni" }, { name: "Cheese" }],
        },
      },
      include: { toppings: true },
    });

    // Additional Customer User (already created above)

    // Unified Users
    await prisma.user.upsert({
      where: { email: "admin@site.com" },
      update: {},
      create: {
        name: "Site Admin",
        email: "admin@site.com",
        password: passwordHash,
        role: "ADMIN",
        phone_number: "1000000000",
      },
    });
    await prisma.user.upsert({
      where: { email: "manager@site.com" },
      update: {},
      create: {
        name: "Site Manager",
        email: "manager@site.com",
        password: passwordHash,
        role: "MANAGER",
        phone_number: "2000000000",
      },
    });
    await prisma.user.upsert({
      where: { email: "customer@site.com" },
      update: {},
      create: {
        name: "Site Customer",
        email: "customer@site.com",
        password: passwordHash,
        role: "CUSTOMER",
        phone_number: "3000000000",
      },
    });

    // Add more pizza varieties for better testing
    const hawaiian = await prisma.menu.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: "Hawaiian",
        price: 18,
        image_url: null,
        restaurants_id: restaurant.id,
        manager_id: manager.id,
        toppings: {
          create: [{ name: "Ham" }, { name: "Pineapple" }, { name: "Cheese" }],
        },
      },
      include: { toppings: true },
    });

    const veggie = await prisma.menu.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: "Vegetarian",
        price: 14,
        image_url: null,
        restaurants_id: restaurant.id,
        manager_id: manager.id,
        toppings: {
          create: [{ name: "Bell Peppers" }, { name: "Mushrooms" }, { name: "Onions" }],
        },
      },
      include: { toppings: true },
    });

    // Sample order with items
    const order = await prisma.order.create({
      data: {
        customer_id: customer.id,
        restaurant_id: restaurant.id,
        status: "PREPARING",
        orderItems: {
          create: [
            {
              menu_id: margherita.id,
              quantity: 1,
              orderItemToppings: {
                create: margherita.toppings
                  .slice(0, 1)
                  .map((t) => ({ topping_id: t.id })),
              },
            },
            {
              menu_id: pepperoni.id,
              quantity: 2,
              orderItemToppings: {
                create: pepperoni.toppings
                  .slice(0, 1)
                  .map((t) => ({ topping_id: t.id })),
              },
            },
          ],
        },
      },
    });

    console.log("Seed complete.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
