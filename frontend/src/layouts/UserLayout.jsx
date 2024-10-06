import { useSelector } from "react-redux";
import {   Navigate, Outlet,  } from "react-router-dom";

const UserLayout = () => {
   const isUserLogin = useSelector((state) => state.customer.isUserLogin);
  //  const navigate = useNavigate();
  //  useEffect(() => {
  //    if (isUserLogin) {
  //      if (location.pathname === "/login") {
  //        navigate("/");
  //      }
  //        if (location.pathname === "/login") {
  //          navigate("/order");
  //        }
     
  //    }
  //  }, [isUserLogin, navigate, ]);

  // return  (
  //   (
  //       <Outlet />
  //   )
   // )
   console.log(isUserLogin)
  
  return isUserLogin ? <Outlet /> : <Navigate to="/login" />
 };

export default UserLayout;
