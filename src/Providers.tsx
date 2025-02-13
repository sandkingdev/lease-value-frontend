import { Outlet } from "react-router-dom";
import { AllContextProvider } from "./context/AllContext";

const Providers = () => {
  return (
    <AllContextProvider>
      <Outlet />
    </AllContextProvider>
  );
};

export default Providers;
