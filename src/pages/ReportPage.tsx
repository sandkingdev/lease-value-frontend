import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";

const ReportPage = () => {
  return (
    <main className="mx-10">
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <div className="main-container gap-y-5">
        <h1 className="header-text text-4xl">This is a Report Page</h1>

        <InputComponent />
      </div>
    </main>
  );
};

export default ReportPage;
