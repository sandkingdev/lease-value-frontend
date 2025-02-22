import { useState, useEffect } from 'react';
import { useAllContext } from "../../context/AllContext";
import supabase from "../../supabase";
import { toast } from "react-toastify";
import { getReportTitlesOfUser, reportsTableName, } from '../../config';

export const CustomModalMainComponent = ({
  setIsOpen,
  buttonLabel,
}: {
  setIsOpen: (isOpen: boolean) => void,
  buttonLabel: string,
}) => {
  const {
    leaseEndDate,
    valuationDate,
    numberOfBedrooms,
    selectedFloorLevelOption,
    selectedFeaturesOption,
    groundRent,
    longLeaseValueOfTheFlat,
    defermentRate,
    midRate,
    lowRate,
    highRate,
    address,
    propertyInflationRate,
  } = useAllContext();
  const [user, setUser] = useState(null);
  const [reportTitleList, setReportTitleList] = useState<string[]>([]);
  const [reportTitle, setReportTitle] = useState<string>('');

  // Get user session on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("data: ", data);
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      // @ts-ignore
      setUser(data.user); // Save user info
      if (data.user) {
        const reportTitleList = await getReportTitlesOfUser(data.user.id);
        if (reportTitleList) setReportTitleList(reportTitleList);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user) {
      toast.error("No user logged in!");
      return;
    }

    if (!reportTitle) {
      toast.error("Please type report title at first");
      return;
    }

    if (reportTitleList.includes(reportTitle)) {
      toast.error('That report title already exists!');
      return;
    }

    // Proceed with update
    const { data, error } = await supabase
      .from(reportsTableName)
      .insert({
        user_id: (user as any).id,
        title: reportTitle,
        lease_end_date: leaseEndDate,
        valuation_date: valuationDate,
        number_of_bedrooms: numberOfBedrooms,
        selected_floor_level_option: selectedFloorLevelOption,
        selected_features_option: selectedFeaturesOption,
        ground_rent: groundRent,
        long_lease_value_of_the_flat: longLeaseValueOfTheFlat,
        deferment_rate: defermentRate,
        mid_rate: midRate,
        low_rate: lowRate,
        high_rate: highRate,
        address,
        property_inflation_rate: propertyInflationRate,
      })
      .select(); // Ensure data is returned

    if (error) {
      console.error("Error saving profile:", error.message);
      return;
    }

    toast.success('Successfull saved');
    console.log("User profile updated:", data);
    setIsOpen(false);
  };

  return (
    <div className='py-4 sp:mt-5 px-4 sm:px-5 font-normal text-sm'>
      <div className='report-title flex gap-x-5 items-center'>
        <div className='text-white'>
          Report Title:
        </div>
        <input value={reportTitle} onChange={(e) => setReportTitle(e.target.value)} className='px-1 py-0 text-base' />
      </div>

      <div className='flex justify-center mt-5'>
        <div className='items-center px-3 py-1 bg-white rounded-md text-base cursor-pointer' onClick={handleSave}>
          {buttonLabel}
        </div>
      </div>
    </div >
  );
}
