import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiCamera,
  FiCameraOff,
  FiRefreshCw,
  FiMaximize,
} from "react-icons/fi";
import Modal from "../../../../../components/ui/Modal";
import Button from "../../../../../components/ui/Button";
import ScannerViewport from "./ScannerViewport";
import CheckInSuccess from "./CheckInSuccess";
import ScannerError from "./ScannerError";
import { formatClock } from "../../../utils/attendanceUtils";

const SCANNING_DELAY = 1800;

const QRScannerModal = ({ open, onClose }) => {
  const [state, setState] = useState("idle");
  const [checkInTime, setCheckInTime] = useState("");

  const handleClose = () => {
    setState("idle");
    onClose();
  };

  useEffect(() => {
    if (state !== "scanning") return undefined;
    const timer = setTimeout(() => {
      setCheckInTime(formatClock(new Date()));
      setState("success");
    }, SCANNING_DELAY);
    return () => clearTimeout(timer);
  }, [state]);

  const renderBody = () => {
    if (state === "scanning") {
      return (
        <ScannerViewport scanning hint="Hold steady while the code is detected">
          <div>
            <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-volt/10 text-volt">
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-scan-ring rounded-full ring-2 ring-volt/50"
              />
              <FiMaximize className="relative h-7 w-7" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-medium text-ink">
              Looking for QR code…
            </p>
            <p className="mt-1 text-xs text-muted">Demo scanning in progress</p>
          </div>
        </ScannerViewport>
      );
    }

    if (state === "success") {
      return <CheckInSuccess checkInTime={checkInTime} onClose={handleClose} />;
    }

    if (state === "error") {
      return (
        <ScannerError
          onRetry={() => setState("idle")}
          onClose={handleClose}
        />
      );
    }

    if (state === "unavailable") {
      return (
        <div className="space-y-5">
          <ScannerViewport hint="Camera access is unavailable">
            <div>
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-panel-2 text-muted">
                <FiCameraOff className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-medium text-ink">
                Camera unavailable
              </p>
              <p className="mt-1 text-xs text-muted">
                No camera permission was requested by this UI demo.
              </p>
            </div>
          </ScannerViewport>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <Button variant="night" onClick={() => setState("idle")}>
              <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
            <Button variant="accent" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <ScannerViewport hint="Position the gym QR code inside the frame">
          <div>
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-panel-2 text-muted">
              <FiCamera className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-medium text-ink">Camera preview</p>
            <p className="mt-1 text-xs text-muted">
              Visual demo only — your camera is never accessed.
            </p>
          </div>
        </ScannerViewport>

        <ol className="list-inside list-decimal space-y-1 text-xs text-muted">
          <li>Open the gym check-in screen on your phone.</li>
          <li>Hold your phone steady inside the frame.</li>
          <li>Wait for the confirmation sound from reception.</li>
        </ol>

        <div className="rounded-xl border border-dashed border-line bg-panel-2/40 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
            UI demo states
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              size="small"
              variant="night"
              onClick={() => setState("error")}
            >
              <FiAlertTriangle className="h-4 w-4" aria-hidden="true" />
              Unreadable code
            </Button>
            <Button
              size="small"
              variant="night"
              onClick={() => setState("unavailable")}
            >
              <FiCameraOff className="h-4 w-4" aria-hidden="true" />
              Camera unavailable
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    if (state === "idle") {
      return (
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <Button variant="night" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="accent" onClick={() => setState("scanning")}>
            <FiMaximize className="h-4 w-4" aria-hidden="true" />
            Start demo scan
          </Button>
        </div>
      );
    }

    if (state === "scanning") {
      return (
        <p className="text-center text-xs text-muted">
          Scanning is simulated — no camera is used.
        </p>
      );
    }

    return null;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size="sm"
      title="Scan Gym QR Code"
      description={
        state === "idle" || state === "scanning"
          ? "Align the gym's QR code inside the frame."
          : undefined
      }
      footer={renderFooter()}
    >
      {renderBody()}
    </Modal>
  );
};

export default QRScannerModal;
