import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import Button from "./Button";

const ErrorState = ({ message, onRetry, compact = false }) => (
  <div
    role="alert"
    className={`flex flex-col items-center justify-center rounded-xl border border-error/25 bg-error/5 text-center ${
      compact ? "px-4 py-6" : "px-6 py-10"
    }`}
  >
    <span className="grid h-12 w-12 place-items-center rounded-full bg-error/10 text-error">
      <FiAlertTriangle className="h-6 w-6" aria-hidden="true" />
    </span>
    <p className="mt-3 text-sm font-semibold text-ink">
      Something went wrong
    </p>
    <p className="mt-1 max-w-sm text-xs text-muted">
      {message || "We couldn't load this data."}
    </p>
    {onRetry && (
      <Button variant="night" size="small" className="mt-4" onClick={onRetry}>
        <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </Button>
    )}
  </div>
);

export default ErrorState;
