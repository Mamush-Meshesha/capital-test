/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defineAbilitiesFor } from "./ability";

const AbilityContext = createContext();

export const AbilityProvider = ({ children, role }) => {
  const [ability, setAbility] = useState(() => defineAbilitiesFor(role));

  useEffect(() => {
    setAbility(defineAbilitiesFor(role));
  }, [role]);

  const value = useMemo(() => ability, [ability]);
  return (
    <AbilityContext.Provider value={value}>{children}</AbilityContext.Provider>
  );
};

export const useAbility = () => {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error("useAbility must be used within an AbilityProvider");
  }
  return context;
};

// /* eslint-disable react/prop-types */
// // src/casl/AbilityContext.jsx
// import  { createContext, useContext, useEffect, useState } from "react";
// import { defineAbilitiesFor } from "./ability";

// const AbilityContext = createContext();

// export const AbilityProvider = ({ children, role }) => {
//   const [ability, setAbility] = useState(() => defineAbilitiesFor(role));

//   useEffect(() => {
//     setAbility(defineAbilitiesFor(role));
//   }, [role]);

//   return (
//     <AbilityContext.Provider value={ability}>
//       {children}
//     </AbilityContext.Provider>
//   );
// };

// // Custom hook to use ability
// export const useAbility = () => {
//   const context = useContext(AbilityContext);
//   if (!context) {
//     throw new Error("useAbility must be used within an AbilityProvider");
//   }
//   return context;
// };
