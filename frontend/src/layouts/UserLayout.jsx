import { useEffect } from "react";
import { useSelector } from "react-redux";
import {   Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
   const isUserLogin = useSelector((state) => state.customer.isUserLogin);
   const navigate = useNavigate();
   useEffect(() => {
     if (isUserLogin) {
       if (location.pathname === "/login") {
         navigate("/");
       }
         if (location.pathname === "/login") {
           navigate("/order");
         }
     
     }
   }, [isUserLogin, navigate, ]);
  return  (
    (
        <Outlet />
    ) 
  )
 };

export default UserLayout;
