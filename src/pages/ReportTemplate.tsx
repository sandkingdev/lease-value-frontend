import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import LeaseExtensionValuation from "../components/LeaseExtensionValuation";
import SummaryofResults from "../components/SummaryofResults";
import PropertyParticulars from "../components/PropertyParticulars";
import PremiumCalculation from "../components/PremiumCalculation";
import Calculations from "../components/Calculations";
import PremiumChart from "../components/PremiumChart";
import DBComponent from "../components/DBComponent";
import { useEffect } from "react";
import { useAllContext } from "../context/AllContext";
import supabase from "../supabase";
import { defaultValueOfTemplate, reportsTableName, reportsTableTitleColumn, reportsTableUserIdColumn } from "../config";

const ReportTemplate = () => {
  const {
    setLeaseEndDate,
    setValuationDate,
    setNumberOfBedrooms,
    setSelectedFloorLevelOption,
    setSelectedFeaturesOption,
    setGroundRent,
    setLongLeaseValueOfTheFlat,
    setDefermentRate,
    setMidRate,
    setLowRate,
    setHighRate,
    setAddress,
    setPropertyInflationRate,
  } = useAllContext();

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("lease-value-user");
      const reportTitle = localStorage.getItem("lease-value-report-title");

      if (userId && reportTitle) {
        await handleLoad(userId, reportTitle);
      } else {
        createNewTemplate();
      }
    })()
  }, [])

  const createNewTemplate = () => {
    setLeaseEndDate(defaultValueOfTemplate.leaseEndDate);
    setValuationDate(defaultValueOfTemplate.valuationDate);
    setNumberOfBedrooms(defaultValueOfTemplate.numberOfBedrooms);
    setSelectedFloorLevelOption(defaultValueOfTemplate.selectedFloorLevelOption);
    setSelectedFeaturesOption(defaultValueOfTemplate.selectedFeaturesOption);
    setGroundRent(defaultValueOfTemplate.groundRent);
    setLongLeaseValueOfTheFlat(defaultValueOfTemplate.longLeaseValueOfTheFlat);
    setDefermentRate(defaultValueOfTemplate.defermentRate);
    setMidRate(defaultValueOfTemplate.midRate);
    setLowRate(defaultValueOfTemplate.lowRate);
    setHighRate(defaultValueOfTemplate.highRate);
    setAddress(defaultValueOfTemplate.address);
    setPropertyInflationRate(defaultValueOfTemplate.propertyInflationRate);
  };

  const handleLoad = async (userId: string, selectedReportTitle: string) => {
    const { data, error } = await supabase
      .from(reportsTableName)
      .select("*") // Select all columns
      .eq(reportsTableTitleColumn, selectedReportTitle)
      .eq(reportsTableUserIdColumn, userId) // Match logged-in user's ID
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
  }

  return (
    <main className="mx-3 md:mx-10">
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <Link className="report-list-link mb-10" to="/report-list">
        ◄ Report List
      </Link>
      <div className="main-container gap-y-5 p-4 lg:p-8">
        <h1 className="header-text text-3xl md:text-4xl">This is a Report Template</h1>

        <DBComponent createNewTemplate={createNewTemplate}/>

        <InputComponent />

        <LeaseExtensionValuation />

        <SummaryofResults />

        <PropertyParticulars />

        <PremiumChart />

        <PremiumCalculation />

        <Calculations />
      </div>
    </main>
  );
};

export default ReportTemplate;
