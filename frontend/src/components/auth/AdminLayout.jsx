import { Navigate } from "react-router-dom";
import Sidebar from "../admin/Sidebar";

const AdminLayout = () => {
  //  const isAdminLogin = useSelector((state) => state.admin.isAdminLogin);
  //  console.log(isAdminLogin);
  // const isAdminLogin =
  //   JSON.parse(localStorage.getItem("isAdminLogin")) || false;

  // return !isAdminLogin ? <Sidebar /> : <Navigate to="/admin/login" />;
  return <Sidebar />;
};

export default AdminLayout;
