/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const auth = useSelector((state) => state?.auth);
  const isAuthenticated = Boolean(auth?.isAuthenticated);
  const role = (auth?.user?.role || "").toString().toLowerCase();

  if (isAuthenticated) {
    if (role === "admin") {
      return <Navigate to="/admin" replace state={{ from: location }} />;
    }
    if (role === "manager") {
      return (
        <Navigate to="/admin/manager" replace state={{ from: location }} />
      );
    }
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default PublicRoute;
