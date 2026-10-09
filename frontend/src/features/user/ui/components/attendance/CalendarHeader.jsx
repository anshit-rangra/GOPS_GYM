import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { formatMonthYear } from "../../../utils/attendanceUtils";

const navButton =
  "rounded-(--radius) p-2 text-muted transition-colors hover:bg-panel-2 hover:text-ink focus-visible:outline-2";

const CalendarHeader = ({ year, month, onPrevious, onNext, onToday }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-base font-semibold text-ink">Attendance Calendar</h2>
      <p className="text-xs text-muted">Select a date to see the details</p>
    </div>

    <div className="flex items-center justify-between gap-1 sm:justify-end">
      <button
        type="button"
        onClick={onToday}
        className="rounded-(--radius) border border-line px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-panel-2 hover:text-ink"
      >
        Today
      </button>
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous month"
        className={navButton}
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>
      <span className="min-w-[108px] text-center text-sm font-medium text-ink">
        {formatMonthYear(year, month)}
      </span>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next month"
        className={navButton}
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default CalendarHeader;
