import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { FiCamera, FiCameraOff, FiMaximize } from "react-icons/fi";
import Modal from "../../../../../components/ui/Modal";
import Button from "../../../../../components/ui/Button";
import CheckInSuccess from "./CheckInSuccess";
import ScannerError from "./ScannerError";
import { markAttendance } from "../../../api/attendanceApi";
import { extractQrSecret } from "../../../utils/qrUtils";
import { getApiErrorMessage } from "../../../../../lib/api/errors";
import { formatClock } from "../../../utils/attendanceUtils";

const REGION_ID = "gops-qr-region";

const QRScannerModal = ({ open, onClose, onCheckedIn }) => {
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const [checkInTime, setCheckInTime] = useState("");

  const scannerRef = useRef(null);
  const handledRef = useRef(false);

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current;
    scannerRef.current = null;
    if (!scanner) return;
    try {
      await scanner.stop();
      scanner.clear();
    } catch {
      /* scanner was not running */
    }
  }, []);

  const handleDecoded = useCallback(
    async (decodedText) => {
      if (handledRef.current) return;
      handledRef.current = true;

      await stopScanner();
      setState("marking");

      const secret = extractQrSecret(decodedText);
      if (!secret) {
        setError(
          "That QR code is not a valid GOPS GYM check-in code. Ask reception for the entrance code.",
        );
        setState("error");
        return;
      }

      try {
        await markAttendance(secret);
        setCheckInTime(formatClock(new Date()));
        setState("success");
        onCheckedIn?.();
      } catch (err) {
        setError(getApiErrorMessage(err));
        setState("error");
      }
    },
    [onCheckedIn, stopScanner],
  );

  const startScanner = useCallback(async () => {
    await stopScanner();
    handledRef.current = false;
    setError("");
    setState("starting");

    try {
      const scanner = new Html5Qrcode(REGION_ID, { verbose: false });
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 220, height: 220 }, aspectRatio: 1 },
        handleDecoded,
        () => {
          /* per-frame decode misses are expected; ignore */
        },
      );

      setState("scanning");
    } catch (err) {
      scannerRef.current = null;
      setError(
        err?.message?.includes("Permission")
          ? "Camera permission was denied. Allow camera access to scan the gym QR code."
          : "No usable camera was found on this device.",
      );
      setState("unavailable");
    }
  }, [handleDecoded, stopScanner]);

  const handleClose = useCallback(async () => {
    await stopScanner();
    setState("idle");
    setError("");
    setCheckInTime("");
    onClose();
  }, [onClose, stopScanner]);

  useEffect(() => () => stopScanner(), [stopScanner]);

  const renderBody = () => {
    if (state === "success") {
      return <CheckInSuccess checkInTime={checkInTime} onClose={handleClose} />;
    }

    if (state === "error") {
      return (
        <ScannerError
          message={error}
          onRetry={startScanner}
          onClose={handleClose}
        />
      );
    }

    if (state === "unavailable") {
      return (
        <div className="space-y-5 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-panel-2 text-muted">
            <FiCameraOff className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-ink">Camera unavailable</p>
            <p className="mt-1 text-xs text-muted">{error}</p>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <Button variant="night" onClick={handleClose}>
              Close
            </Button>
            <Button variant="accent" onClick={startScanner}>
              Try again
            </Button>
          </div>
        </div>
      );
    }

    const isLive = state === "scanning";
    const isStarting = state === "starting";
    const isMarking = state === "marking";

    return (
      <div className="space-y-4">
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-line bg-night-soft">
          <div
            id={REGION_ID}
            className="absolute inset-0 [&_canvas]:hidden [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
          />

          {isLive && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-1/2 h-0.5 animate-scan-sweep rounded-full bg-volt/80"
            />
          )}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-3 h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-volt"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-3 h-7 w-7 rounded-tr-lg border-r-2 border-t-2 border-volt"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-3 h-7 w-7 rounded-bl-lg border-b-2 border-l-2 border-volt"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-volt"
          />

          {(state === "idle" || isStarting || isMarking) && (
            <div className="absolute inset-0 grid place-items-center bg-night-soft/90 p-6 text-center">
              {isStarting || isMarking ? (
                <div>
                  <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-volt/30 border-t-volt" />
                  <p className="mt-3 text-sm font-medium text-ink">
                    {isMarking ? "Recording your check-in…" : "Starting camera…"}
                  </p>
                </div>
              ) : (
                <div>
                  <FiCamera
                    className="mx-auto h-8 w-8 text-volt"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-medium text-ink">
                    Camera preview
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Start the camera and point it at the gym&apos;s entrance QR
                    code.
                  </p>
                </div>
              )}
            </div>
          )}

          {isLive && (
            <p className="absolute inset-x-4 bottom-4 text-center text-[11px] font-medium text-volt">
              Scanning… hold steady
            </p>
          )}
        </div>

        <ol className="list-inside list-decimal space-y-1 text-xs text-muted">
          <li>Open the check-in screen from the gym entrance QR code.</li>
          <li>Hold your phone steady inside the frame.</li>
          <li>Your visit is logged as soon as the code is recognised.</li>
        </ol>
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
          <Button variant="accent" onClick={startScanner}>
            <FiMaximize className="h-4 w-4" aria-hidden="true" />
            Start camera
          </Button>
        </div>
      );
    }

    if (state === "scanning") {
      return (
        <div className="flex justify-center">
          <Button variant="night" onClick={handleClose}>
            <FiCameraOff className="h-4 w-4" aria-hidden="true" />
            Stop scanning
          </Button>
        </div>
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
        state === "idle" || state === "scanning" || state === "starting"
          ? "Use your camera to scan the check-in QR code at the gym."
          : undefined
      }
      footer={renderFooter()}
    >
      {renderBody()}
    </Modal>
  );
};

export default QRScannerModal;
