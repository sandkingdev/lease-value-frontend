import { Link } from "react-router-dom";
import supabase from "../supabase";
import { useAllContext } from "../context/AllContext";

const HomePage = () => {
  const { session } = useAllContext();
  return (
    <main>
      <section className="main-container">
        <h1 className="header-text">Valuation Model</h1>
        <p>Current User : {session?.user.email || "None"}</p>
        {session ? (
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        ) : (
          <Link to="/auth/sign-in">Sign In</Link>
        )}
        <Link to="/report">Report Page 🛡️</Link>
      </section>
    </main>
  );
};

export default HomePage;
