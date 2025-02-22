import { Link } from "react-router-dom";
import supabase from "../supabase";
import { useAllContext } from "../context/AllContext";

const HomePage = () => {
  const { session } = useAllContext();

  const handleSignOut = () => {
    console.log("session: ", session);

    supabase.auth.signOut();
  }

  return (
    <main className="mx-2 md:mx-10">
      <section className="main-container p-4 lg:p-8">
        <h1 className="header-text">Valuation Model</h1>
        <p>Current User : {session?.user.email || "None"}</p>
        {session ? (
          <button onClick={() => handleSignOut()}>Sign Out</button>
        ) : (
          <Link to="/auth/sign-in">Sign In</Link>
        )}
        <Link to="/report-template">Report Template</Link>
        <Link to="/report-list">Report List</Link>
      </section>
    </main>
  );
};

export default HomePage;
