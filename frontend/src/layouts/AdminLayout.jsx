import { useSelector } from "react-redux";
import Sidebar from "../components/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = () => {
const isAdminLogin = useSelector((state) => state.admin.isAdminLogin);
const navigate = useNavigate(); 

useEffect(() => {
  if (!isAdminLogin) {
    navigate("/admin/login"); 
  }
}, [isAdminLogin, navigate]);
  return (
    <>
      <Sidebar />
    </>
  );
};

export default AdminLayout;
