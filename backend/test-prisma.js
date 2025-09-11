// Simple test to verify Prisma migration
const prisma = require("./lib/prisma");

async function testPrismaConnection() {
  try {
    console.log("Testing Prisma connection...");

    // Test database connection
    await prisma.$connect();
    console.log("✅ Database connection successful");

    // Test a simple query (this will work even with empty database)
    const adminCount = await prisma.admin.count();
    console.log(`✅ Admin count query successful: ${adminCount} admins`);

    const customerCount = await prisma.customer.count();
    console.log(
      `✅ Customer count query successful: ${customerCount} customers`
    );

    const menuCount = await prisma.menu.count();
    console.log(`✅ Menu count query successful: ${menuCount} menus`);

    console.log("🎉 All Prisma tests passed! Migration successful.");
  } catch (error) {
    console.error("❌ Prisma test failed:", error.message);
  } finally {
    await prisma.$disconnect();
    console.log("Database connection closed.");
  }
}

// Run the test
testPrismaConnection();

