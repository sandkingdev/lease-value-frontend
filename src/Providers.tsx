import { Outlet, useLocation } from "react-router-dom";
import { AllContextProvider } from "./context/AllContext";
import { useEffect } from "react";


const Providers = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname != '/report-template') {
      localStorage.setItem("lease-value-report-title", "");
    }
  }, [location]);

  return (
    <AllContextProvider>
      <Outlet />
    </AllContextProvider>
  );
};

export default Providers;
