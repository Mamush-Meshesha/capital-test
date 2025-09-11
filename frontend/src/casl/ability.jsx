import { AbilityBuilder, Ability } from "@casl/ability";

export const defineAbilitiesFor = (role) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (role === "admin") {
    can("manage", "Admin");
    can("read", "Home");
  } else if (role === "manager") {
    can("read", "Manager");
    can("read", "Home");
  } else if (role === "customer") {
    can("read", "Order");
    can("read", "Home");
  } else {
    can("read", "Home");
    cannot("read", "Order");
    cannot("manage", "Admin");
  }

  return build();
};

// // src/casl/ability.jsx
// import {  AbilityBuilder } from "@casl/ability";

// // Define permissions for each role
// export const defineAbilitiesFor = (role) => {
//   const { can, cannot, build } = new AbilityBuilder(Ability);

//   if (role === "admin") {
//     can("manage", "all"); // Admin can access everything
//   } else if (role === "user") {
//     can("read", "Home"); // Regular users can read Home page
//     can("read", "Order"); // Regular users can read Order page
//     cannot("read", "AdminHome"); // Users cannot access Admin pages
//   } else {
//     can("read", "Home"); // Guests can access Home page only
//   }

//   return build();
// };
