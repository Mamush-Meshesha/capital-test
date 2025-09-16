const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");

const { generateToken } = require("../utils/jwt-uitls");

const register = async (req, res) => {
  try {
    const { name, email, password, phone_number, location, role } =
      req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const roleName = (role || "CUSTOMER").toUpperCase();
    const roleRecord = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!roleRecord) {
      return res.status(400).json({ message: `Role ${roleName} not found` });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        phone_number: phone_number ?? null,
        location: location ?? null,
        role_id: roleRecord.id,
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            role_permissions: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const roleName = user.role?.name?.toLowerCase() || "customer";
    generateToken(res, user.id, roleName);

    const permissions =
      user.role?.role_permissions?.flatMap((rp) => rp.permissions) ?? [];

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: {
        id: user.role?.id,
        name: user.role?.name,
        created_at: user.role?.created_at,
      },
      permissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
