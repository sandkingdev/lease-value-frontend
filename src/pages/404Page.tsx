import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <main className="mx-3 md:mx-10">
      <section className="main-container  p-4 lg:p-8">
        <h1 className="header-text">404 Page Not Found</h1>
        <Link to="/">Go back to Home</Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
