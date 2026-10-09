import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import { Button } from "../../../../../components/ui";

const ScannerError = ({ onRetry, onClose }) => (
  <div className="text-center">
    <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-error/12 text-error ring-1 ring-error/30">
      <FiAlertTriangle className="h-8 w-8" aria-hidden="true" />
    </span>

    <h3 className="mt-4 text-lg font-semibold text-ink">
      Couldn&apos;t read that code
    </h3>
    <p className="mt-1 text-sm text-muted">
      The QR code appears to be invalid or unreadable. Please try again.
    </p>

    <p className="mt-3 rounded-xl border border-dashed border-line bg-panel-2/50 p-3 text-xs text-muted">
      Demo error state — no QR decoding is performed in this UI.
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
