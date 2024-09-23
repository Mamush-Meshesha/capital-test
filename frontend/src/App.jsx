import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AdminHome from "./pages/admin/HomeA";

function App() {
  return <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
  </Router>
  </>;
}

export default App;
