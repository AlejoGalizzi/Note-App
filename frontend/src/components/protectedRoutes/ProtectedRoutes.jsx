import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { withAuth } from "../../util/withAuth";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsAuthenticated(await withAuth());
      setIsLoading(false);
    } 
    checkAuthentication();
  }, []);

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isAuthenticated) { 
    return <Outlet />
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
