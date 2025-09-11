import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLayout = () => {
  const auth = useSelector((state) => state?.auth);
  const role = (auth?.user?.role || "guest").toString().toLowerCase();
  const isUserLogin = Boolean(auth?.isAuthenticated || role !== "guest");

  return isUserLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default UserLayout;
