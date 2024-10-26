import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, adminOnly, ...rest }) => {
  const navigate = useNavigate();

  // Replace the following line with your actual authentication logic
  const isAuthenticated = localStorage.getItem("tokenTika");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/nsrxmgt"); // Redirect to the login page if not authenticated
    } else if (adminOnly && userRole !== "Admin") {
      // Redirect to a restricted page if not an admin
      navigate("/nsrxmgt/restricted");
    }
  }, [isAuthenticated, userRole, adminOnly, navigate]);

  return isAuthenticated && (!adminOnly || userRole === "Admin") ? element : null;
};

export default PrivateRoute;
