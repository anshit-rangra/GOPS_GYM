import { Link } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "../ui";

const NotFound = () => (
  <div className="app-shell theme-dark grid min-h-screen place-items-center bg-night px-4 text-ink">
    <div className="text-center">
      <p className="text-6xl font-extrabold text-volt">404</p>
      <h1 className="mt-3 text-xl font-bold">Page not found</h1>
      <p className="mt-1 text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link to="/" className="mt-6 inline-block">
        <Button variant="accent">
          <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
