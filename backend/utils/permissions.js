const { AbilityBuilder, Ability } = require("@casl/ability");

function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === "admin") {
    can("manage", "all");
    can("create", "Role");
    can("register", "Manager");
    can("register", "Restaurant");
  } else if (user.role === "manager") {
    can("update", "Order");
    can("see", "Order");
    cannot("register", "Manager");
  } else if (user.role === "customer") {
    can("create", "Order");
    can("see", "Order", { customerId: user.id });
    cannot("update", "Order");
  }

  return build();
}



module.exports = { defineAbilitiesFor };
