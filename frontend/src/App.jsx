// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import Order from "./pages/Order";
// import AdminHome from "./pages/admin/HomeA";
// import AdminLayout from "./layouts/AdminLayout";
// import UserLayout from "./layouts/UserLayout";
// import AdminLogin from "./pages/admin/AdminLogin";
// // import { AbilityProvider } from "./casl/AbilityContext";

// function App() {
//   const role = useSelector((state) => state.admin.isAdmin || "guest");

//   return (
//     // <AbilityProvider role={role}>
//       <Router>
//         {/* PUBLIC ROUTE */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//         {/* USER ROUTE */}
//         <Routes>
//           <Route path="/order" element={<UserLayout />}>
//             <Route path="" element={<Order />} />
//           </Route>
//         </Routes>
//         {/* ADMIN */}
//         <Routes>
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route path="" element={<AdminHome />} />
//             <Route path="/admin/login" element={<AdminLogin />} />
//           </Route>
//         </Routes>
//       </Router>
//     // </AbilityProvider>
//   );
// }

// export default App;

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Any shared components, such as a Header or Footer, can go here */}
      <main>
        <Outlet /> {/* This will render the nested route components */}
      </main>
    </div>
  );
}

export default App;
