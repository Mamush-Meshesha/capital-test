import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAbility } from "../../casl/AbilityContext";

const AdminProtectedRoute = () => {
  const ability = useAbility();
  const auth = useSelector((state) => state?.auth);
  const role = (auth?.user?.role || "").toString().toLowerCase();
  const isAdmin = role === "admin";
  const location = useLocation();

  if (!isAdmin || !ability.can("manage", "Admin")) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
