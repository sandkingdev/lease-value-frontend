import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase";
import LoadingPage from "../pages/LoadingPage";
import { Session } from "@supabase/supabase-js";

interface AllContextType {
  session: Session | null,
  leaseEndDate: Date | undefined,
  setLeaseEndDate: (leaseEndDate: Date | undefined) => void,
  valuationDate: Date | undefined,
  setValuationDate: (valuationDate: Date | undefined) => void,
}

const AllContext = createContext<AllContextType | null>(null);

export const useAllContext = () => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error("useAllContext must be used within a AllContextProvider");
  }
  return context;
};

type Props = { children: React.ReactNode };

export const AllContextProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // state variables
  const [leaseEndDate, setLeaseEndDate] = useState<Date>();
  const [valuationDate, setValuationDate] = useState<Date>();

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setIsLoading(false);
        // update state variables

      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <AllContext.Provider
      value={{
        session,
        leaseEndDate,
        setLeaseEndDate,
        valuationDate,
        setValuationDate,
      }}
    >
      {isLoading ? <LoadingPage /> : children}
    </AllContext.Provider>
  );
};
