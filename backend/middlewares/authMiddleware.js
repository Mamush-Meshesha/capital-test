const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
const protectManager = async (req, res, next) => {
  let token = req.cookies.jwt;

  console.log("Token from cookie:", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      console.log("Decoded JWT:", decoded);

      req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

      if (!req.user) {
        console.log("User not found for id:", decoded.id);
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      if (req.user.role !== "MANAGER") {
        return res
          .status(401)
          .json({ message: "Not authorized, manager access required" });
      }

      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const protectCustomer = async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("Received token:", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      console.log("Decoded token:", decoded);

      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!req.user) {
        console.log("User not found for id:", decoded.id);
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      if (req.user.role !== "CUSTOMER") {
        return res
          .status(401)
          .json({ message: "Not authorized, customer access required" });
      }

      console.log("User found:", req.user.id);
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No token found");
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const superAdmin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized, admin access only" });
  }
};

const manager = (req, res, next) => {
  if (req.user && req.user.role === "MANAGER") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized, Manager only" });
  }
};

module.exports = {
  protect,
  superAdmin,
  manager,
  protectManager,
  protectCustomer,
};
