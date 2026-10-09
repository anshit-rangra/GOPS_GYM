import { useState } from "react";
import { FiInfo, FiMaximize } from "react-icons/fi";
import { Button, Card } from "../../../../../components/ui";
import QRScannerModal from "../attendance/QRScannerModal";

const QRCodeCheckIn = () => {
  const [scannerOpen, setScannerOpen] = useState(false);

  return (
    <>
      <Card
        variant="panel"
        padding="base"
        className="relative overflow-hidden sm:p-6"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-volt/10 blur-3xl"
        />

        <div className="relative grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-volt/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-volt">
              <FiMaximize className="h-3.5 w-3.5" aria-hidden="true" />
              Step 1 · Gym check-in
            </span>
            <h2 className="mt-3 text-xl font-bold text-ink sm:text-2xl">
              Scan the QR code to mark your attendance
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Open the scanner and point your camera at the QR code at the
              reception desk or entrance kiosk. Your visit is logged instantly.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button variant="accent" onClick={() => setScannerOpen(true)}>
                <FiMaximize className="h-4 w-4" aria-hidden="true" />
                Scan QR Code
              </Button>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <FiInfo className="h-3.5 w-3.5" aria-hidden="true" />
                UI demo — no real check-in is recorded.
              </span>
            </div>
          </div>

          <div className="relative hidden aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-volt/25 bg-night-soft md:flex">
            <span
              aria-hidden="true"
              className="absolute left-4 top-4 h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-volt/60"
            />
            <span
              aria-hidden="true"
              className="absolute right-4 top-4 h-7 w-7 rounded-tr-lg border-r-2 border-t-2 border-volt/60"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 h-7 w-7 rounded-bl-lg border-b-2 border-l-2 border-volt/60"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-volt/60"
            />
            <div className="text-center">
              <FiMaximize
                className="mx-auto h-9 w-9 text-volt"
                aria-hidden="true"
              />
              <p className="mt-2 text-xs text-muted">
                Point your camera at the entrance QR
              </p>
            </div>
          </div>
        </div>
      </Card>

      <QRScannerModal
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
      />
    </>
  );
};

export default QRCodeCheckIn;
