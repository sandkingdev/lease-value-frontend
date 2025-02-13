import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase";
import LoadingPage from "../pages/LoadingPage";
import { Session } from "@supabase/supabase-js";
import { getRemainingYears } from "../config";

interface AllContextType {
  session: Session | null,
  leaseEndDate: Date,
  setLeaseEndDate: (leaseEndDate: Date) => void,
  valuationDate: Date,
  setValuationDate: (valuationDate: Date) => void,
  durationYears: number,
  numberOfBedrooms: number,
  setNumberOfBedrooms: (numberOfBedrooms: number) => void,
  selectedFloorLevelOption: any;
  setSelectedFloorLevelOption: (selectedFloorLevelOption: any) => void;
  selectedFeaturesOption: any;
  setSelectedFeaturesOption: (option: any) => void;
  groundRent: number;
  setGroundRent: (groundRent: number) => void;
  longLeaseValueOfTheFlat: number;
  setLongLeaseValueOfTheFlat: (longLeaseValueOfTheFlat: number) => void;
  defermentRate: number;
  setDefermentRate: (defermentRate: number) => void;
  capitalisationRate: number;
  setCapitalisationRate: (capitalisationRate: number) => void;
  lowRate: number;
  setLowRate: (lowRate: number) => void;
  highRate: number;
  setHighRate: (highRate: number) => void;
  address: string,
  setAddress: (address: string) => void,
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
  const [leaseEndDate, setLeaseEndDate] = useState<Date>(new Date("2108-12-24T20:00:00"));
  const [valuationDate, setValuationDate] = useState<Date>(new Date("2033-03-01T20:00:00"));
  const [durationYears, setDurationYears] = useState<number>(getRemainingYears(valuationDate, leaseEndDate));
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<number>(2);
  const [selectedFloorLevelOption, setSelectedFloorLevelOption] = useState("basement");
  const [selectedFeaturesOption, setSelectedFeaturesOption] = useState("no garden");
  const [groundRent, setGroundRent] = useState<number>(10);
  const [longLeaseValueOfTheFlat, setLongLeaseValueOfTheFlat] = useState<number>(250000);
  const [defermentRate, setDefermentRate] = useState<number>(5);
  const [capitalisationRate, setCapitalisationRate] = useState<number>(6.5);
  const [lowRate, setLowRate] = useState<number>(7);
  const [highRate, setHighRate] = useState<number>(6);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    setDurationYears(getRemainingYears(valuationDate, leaseEndDate));
  }, [
    leaseEndDate,
    valuationDate,
    numberOfBedrooms,
    selectedFloorLevelOption,
    selectedFeaturesOption,
    groundRent,
    longLeaseValueOfTheFlat,
    defermentRate,
    capitalisationRate,
    lowRate,
    highRate,
    address,
  ]);

  return (
    <AllContext.Provider
      value={{
        session,
        leaseEndDate,
        setLeaseEndDate,
        valuationDate,
        setValuationDate,
        durationYears,
        numberOfBedrooms,
        setNumberOfBedrooms,
        selectedFloorLevelOption,
        setSelectedFloorLevelOption,
        selectedFeaturesOption,
        setSelectedFeaturesOption,
        groundRent,
        setGroundRent,
        longLeaseValueOfTheFlat,
        setLongLeaseValueOfTheFlat,
        defermentRate,
        setDefermentRate,
        capitalisationRate,
        setCapitalisationRate,
        lowRate,
        setLowRate,
        highRate,
        setHighRate,
        address,
        setAddress,
      }}
    >
      {isLoading ? <LoadingPage /> : children}
    </AllContext.Provider>
  );
};
