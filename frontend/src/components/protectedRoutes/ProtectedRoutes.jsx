import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "../../api/configRequest";

const validate = async (token) => {
  try{
    const response = await validateToken(
      token
    );
    return response.status === 200;
  } catch {
    return false;
  }
};

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if(token) {
        const isValid = await validate(token);
        setIsAuthenticated(isValid);
        setIsLoading(false);
      }
      
    } 
    checkAuthentication();
  }, []);

  console.log(isAuthenticated)

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isAuthenticated) {
    <Outlet />
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
