const { defineAbilitiesFor } = require("../utils/permissions");

function abilityMiddleware(req, res, next) {
  const user = req.user;
  req.ability = defineAbilitiesFor(user || { role: "guest" });
  next();
}

function authorize(action, subject, conditions) {
  return (req, res, next) => {
    const ability =
      req.ability || defineAbilitiesFor(req.user || { role: "guest" });
    const can = ability.can(action, subject, conditions);
    if (!can) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

module.exports = { abilityMiddleware, authorize };
