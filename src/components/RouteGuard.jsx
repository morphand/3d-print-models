import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/Auth";

function RouteGuard({ requireUserLoggedIn, requireUserLoggedOut }) {
  const authContext = useContext(AuthContext);
  const isUserLoggedIn = authContext.isUserLoggedIn;

  if (requireUserLoggedIn && !isUserLoggedIn) {
    return <Navigate to="/login" />;
  } else if (requireUserLoggedOut && isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default RouteGuard;
