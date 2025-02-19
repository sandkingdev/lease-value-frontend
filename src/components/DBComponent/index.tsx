import { useEffect, useState } from "react";
import { useAllContext } from "../../context/AllContext";
import supabase from "../../supabase";
import { toast } from "react-toastify";

const DBComponent = () => {
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
    const [userData, setUserData] = useState(null);

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
        };
        fetchUser();
    }, []);

    const handleSave = async () => {
        if (!user) {
            console.error("No user logged in!");
            return;
        }

        // Proceed with update
        const { data, error } = await supabase
            .from("profiles")
            .upsert({
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
            .eq("id", (user as any).id)
            .select(); // Ensure data is returned

        if (error) {
            console.error("Error saving profile:", error.message);
            return;
        }

        toast.success('Successfull saved');
        console.log("User profile updated:", data);
    };

    const handleLoad = async () => {
        if (!user) {
            console.error("No user logged in!");
            return;
        }

        // Fetch user data from `profiles`
        const { data, error } = await supabase
            .from("profiles")
            .select("*") // Select all columns
            .eq("id", (user as any).id) // Match logged-in user's ID
            .single(); // Expect only one result

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

        toast.success('Successfull loaded');
        setUserData(data); // Save data in state
    }

    return (
        <div className="flex gap-x-10">
            <div className="bg-light-green px-5 py-1 border border-1 rounded-lg" onClick={handleSave}>Save</div>
            <div className="bg-light-green px-5 py-1 border border-1 rounded-lg" onClick={handleLoad}>Load</div>
        </div>
    )
};

export default DBComponent;