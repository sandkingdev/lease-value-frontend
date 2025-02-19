import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAllContext } from "../../context/AllContext";
import supabase from "../../supabase";

const SignUpPage = () => {
  // ==============================
  // If user is already logged in, redirect to home
  // This logic is being repeated in SignIn and SignUp..
  const { session } = useAllContext();
  if (session) return <Navigate to="/" />;
  // maybe we can create a wrapper component for these pages
  // just like the ./router/AuthProtectedRoute.tsx? up to you.
  // ==============================
  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Creating account...");
    const { error } = await supabase.auth.signUp({
      email: formValues.email,
      password: formValues.password,
    });
    if (error) {
      alert(error.message);
    }

    setStatus("");
  };

  return (
    <main className="mx-3 md:mx-10">
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <form className="main-container p-4 lg:p-8" onSubmit={handleSubmit}>
        <h1 className="header-text">Sign Up</h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#777",
          }}
        >
          Demo app, please don't use your real email or password
        </p>
        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Create Account</button>
        <Link className="auth-link" to="/auth/sign-in">
          Already have an account? Sign In
        </Link>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
