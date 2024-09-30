import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  // const isAdmin = useSelector((state) => state.admin.isAdmin); // Assuming this returns true/false

  // // Redirect to login if the user is not an admin
  // if (!isAdmin) {
  //   return <Navigate to="/admin/login" replace />;
  // }


  return (
    <>
      <Sidebar />
    </>
  );
};

export default AdminLayout;
