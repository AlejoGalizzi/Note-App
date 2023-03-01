import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { withAuth } from "../../util/withAuth";


const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    withAuth().then(valid => {
      setIsAuthenticated(valid)
    }).catch(error => setIsAuthenticated(false))
    
  }, []);
  if(isAuthenticated === null) {
    return <div>Loading...</div>
  }

  if(isAuthenticated) { 
    return <Outlet />
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
