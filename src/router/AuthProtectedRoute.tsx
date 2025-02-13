import { Outlet } from "react-router-dom";
import NotFoundPage from "../pages/404Page";
import { useAllContext } from "../context/AllContext";

const AuthProtectedRoute = () => {
  const { session } = useAllContext();
  if (!session) {
    // or you can redirect to a different page and show a message
    return <NotFoundPage />;
  }
  return <Outlet />;
};

export default AuthProtectedRoute;
