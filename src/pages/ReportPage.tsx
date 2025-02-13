import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import LeaseExtensionValuation from "../components/LeaseExtensionValuation";
import SummaryofResults from "../components/SummaryofResults";
import PropertyParticulars from "../components/PropertyParticulars";

const ReportPage = () => {
  return (
    <main className="mx-3 md:mx-10">
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <div className="main-container gap-y-5 p-4 lg:p-8">
        <h1 className="header-text text-3xl md:text-4xl">This is a Report Page</h1>

        <InputComponent />

        <LeaseExtensionValuation />

        <SummaryofResults />

        <PropertyParticulars />
      </div>
    </main>
  );
};

export default ReportPage;
