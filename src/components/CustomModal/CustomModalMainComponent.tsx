import { useState, useEffect } from 'react';
import { useAllContext } from "../../context/AllContext";
import supabase from "../../supabase";
import { toast } from "react-toastify";
import { modalTitles, reportsTableName, reportsTableTitleColumn, reportsTableUserIdColumn } from '../../config';

export const CustomModalMainComponent = ({
  setIsOpen,
  buttonLabel,
}: {
  setIsOpen: (isOpen: boolean) => void,
  buttonLabel: string,
}) => {
  const {
    leaseEndDate,
    setLeaseEndDate,
    valuationDate,
    setValuationDate,
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
    midRate,
    setMidRate,
    lowRate,
    setLowRate,
    highRate,
    setHighRate,
    address,
    setAddress,
    propertyInflationRate,
    setPropertyInflationRate,
  } = useAllContext();
  const [user, setUser] = useState(null);
  const [reportTitleList, setReportTitleList] = useState<string[]>([]);
  const [reportTitle, setReportTitle] = useState<string>('');
  const [selectedReportTitle, setSelectedReportTitle] = useState<string>('');

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
        // await getUserData(data.user.id);
        await getReportTitlesOfUser(data.user.id);
      }
    };
    fetchUser();
  }, []);

  const getReportTitlesOfUser = async (userId: string) => {
    const { data, error } = await supabase
      .from(reportsTableName)
      .select(reportsTableTitleColumn) // Select all columns
      .eq(reportsTableUserIdColumn, userId);

    if (error) {
      console.error("Error loading profile:", error.message);
      return;
    }

    console.log("data: ====  ", data);
    //@ts-ignore
    setReportTitleList(data.map((item: { title: string }) => item.title));
  }

  const handleLoad = async () => {
    const { data, error } = await supabase
      .from(reportsTableName)
      .select("*") // Select all columns
      .eq(reportsTableTitleColumn, selectedReportTitle)
      .eq(reportsTableUserIdColumn, (user as any).id) // Match logged-in user's ID
      .single(); // Expect only one result

    console.log("load data === ", data);

    if (error) {
      console.error("Error loading profile:", error.message);
      return;
    }

    setLeaseEndDate(new Date(data.lease_end_date));
    setValuationDate(new Date(data.valuation_date));
    setNumberOfBedrooms(data.number_of_bedrooms);
    setSelectedFloorLevelOption(data.selected_floor_level_option);
    setSelectedFeaturesOption(data.selected_features_option);
    setGroundRent(data.ground_rent);
    setLongLeaseValueOfTheFlat(data.long_lease_value_of_the_flat);
    setDefermentRate(data.deferment_rate);
    setMidRate(data.mid_rate);
    setLowRate(data.low_rate);
    setHighRate(data.high_rate);
    setAddress(data.address);
    setPropertyInflationRate(data.property_inflation_rate);

    setIsOpen(false);
  }

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
      {
        buttonLabel == modalTitles.save && (
          <div className='report-title flex gap-x-5 items-center'>
            <div className='text-white'>
              Report Title:
            </div>
            <input value={reportTitle} onChange={(e) => setReportTitle(e.target.value)} className='px-1 py-0 text-base' />
          </div>
        )
      }

      <div className='py-3 text-white flex flex-col gap-y-1'>
        <div className='text-2xl'>
          Report list
        </div>
        <div className='bg-white/30 flex flex-col gap-y-2 overflow-y-auto h-20'>
          {reportTitleList.map((item: string, index: number) => (
            <div key={index} className={`py-0.5 px-1 cursor-pointer ${selectedReportTitle == item && 'bg-black/10'}`} onClick={() => setSelectedReportTitle(item)}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center mt-5'>
        <div className='items-center px-3 py-1 bg-white rounded-md text-base cursor-pointer' onClick={buttonLabel == modalTitles.save ? handleSave : handleLoad}>
          {buttonLabel}
        </div>
      </div>
    </div >
  );
}
