import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLayout = () => {
  // const { role } = useSelector((state) => state.user);
  // const ability = useAbility();

  return (
    (
      // <Can I="read" a="Order" ability={ability}>
        <Outlet />
      // </Can>
    ) || <Navigate to="/login" replace />
  );
};

export default UserLayout;
