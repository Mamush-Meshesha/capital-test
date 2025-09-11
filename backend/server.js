const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const prisma = require("./lib/prisma");
const adminRouter = require("./routes/admin.route");
const managerRoute = require("./routes/manager.route");
const userRoute = require("./routes/user.route");
const pizzaRoute = require("./routes/pizza.route");
const authRoute = require("./routes/auth.route");
const orderRoute = require("./routes/order.route");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://capital-test-one.vercel.app",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Food Ordering API!");
});
app.use("/api", adminRouter);
app.use("/api", managerRoute);
app.use("/api", userRoute);
app.use("/api", pizzaRoute);
app.use("/api", authRoute);
app.use("/api", orderRoute);

// Stripe payment intent endpoint
app.post("/api/payments/create-intent", async (req, res) => {
  try {
    const { amount, currency = "usd" } = req.body || {};
    if (!process.env.STRIPE_SECRET_KEY) {
      return res
        .status(500)
        .json({ message: "Stripe secret key not configured" });
    }
    if (!amount || Number.isNaN(Number(amount))) {
      return res
        .status(400)
        .json({ message: "Amount is required (in smallest currency unit)" });
    }
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const intent = await stripe.paymentIntents.create({
      amount: Math.floor(Number(amount)),
      currency,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: intent.client_secret });
  } catch (e) {
    console.error("Stripe intent error", e);
    res.status(500).json({ message: e.message || "Stripe error" });
  }
});

prisma
  .$connect()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
