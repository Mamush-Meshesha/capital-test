import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ManagerProtectedRoute = () => {
  const isManagerLogin = useSelector((state) => state.manager.isManagerLogin);
  const location = useLocation();

  if (!isManagerLogin) {
    return <Navigate to="/manager/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ManagerProtectedRoute;
