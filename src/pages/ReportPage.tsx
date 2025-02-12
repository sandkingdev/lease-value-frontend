import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const ReportPage = () => {
  const { session } = useSession();
  return (
    <main>
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <section className="main-container">
        <h1 className="header-text">This is a Report Page</h1>
        <p>Current User : {session?.user.email || "None"}</p>
      </section>
    </main>
  );
};

export default ReportPage;
