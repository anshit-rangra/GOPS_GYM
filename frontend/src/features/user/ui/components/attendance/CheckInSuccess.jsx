import { FiCheckCircle, FiInfo } from "react-icons/fi";
import { Button } from "../../../../../components/ui";

const CheckInSuccess = ({ checkInTime, onClose }) => (
  <div className="text-center">
    <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-volt/15 text-volt ring-1 ring-volt/40">
      <FiCheckCircle className="h-8 w-8" aria-hidden="true" />
    </span>

    <h3 className="mt-4 text-lg font-semibold text-ink">
      Check-in Demo Complete
    </h3>
    <p className="mt-1 text-sm text-muted">Mock check-in time</p>
    <p className="mt-0.5 text-2xl font-bold text-volt">{checkInTime}</p>

    <div className="mt-4 flex items-start gap-2 rounded-xl border border-line bg-panel-2 p-3 text-left">
      <FiInfo className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
      <p className="text-xs text-muted">
        This is a UI demonstration only — no real attendance was recorded and no
        gym systems were contacted.
      </p>
    </div>

    <Button variant="accent" fullWidth className="mt-5" onClick={onClose}>
      Done
    </Button>
  </div>
);

export default CheckInSuccess;
