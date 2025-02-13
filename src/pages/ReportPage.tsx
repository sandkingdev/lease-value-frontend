import { Link } from "react-router-dom";
import InputComponent from "../components/InputComponent";

const ReportPage = () => {
  return (
    <main>
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <section className="main-container">
        <h1 className="header-text">This is a Report Page</h1>

        <InputComponent />
      </section>
    </main>
  );
};

export default ReportPage;
