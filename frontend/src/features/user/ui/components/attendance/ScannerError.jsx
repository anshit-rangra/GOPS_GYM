import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import { Button } from "../../../../../components/ui";

const ScannerError = ({ message, onRetry, onClose }) => (
  <div className="text-center">
    <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-error/12 text-error ring-1 ring-error/30">
      <FiAlertTriangle className="h-8 w-8" aria-hidden="true" />
    </span>

    <h3 className="mt-4 text-lg font-semibold text-ink">
      Check-in failed
    </h3>
    <p className="mt-1 text-sm text-muted">
      {message || "The QR code could not be verified. Please try again."}
    </p>

    <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row">
      <Button variant="night" fullWidth onClick={onClose}>
        Cancel
      </Button>
      <Button variant="accent" fullWidth onClick={onRetry}>
        <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </Button>
    </div>
  </div>
);

export default ScannerError;
