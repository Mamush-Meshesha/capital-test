import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAbility } from "../../casl/AbilityContext";

const ProtectedRoute = () => {
  const auth = useSelector((state) => state?.auth);
  const role = (auth?.user?.role || "guest").toString().toLowerCase();
  const isAuthed = Boolean(auth?.isAuthenticated || role !== "guest");
  const ability = useAbility();
  const location = useLocation();

  const canAccess = ability.can("read", "Order");

  if (!isAuthed || !canAccess) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
