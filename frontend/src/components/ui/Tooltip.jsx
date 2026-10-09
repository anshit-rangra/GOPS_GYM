import { useState } from "react";

const ALIGNMENT = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

const Tooltip = ({
  content,
  children,
  align = "center",
  className = "",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <div
        role="tooltip"
        className={`pointer-events-none absolute bottom-full z-40 mb-2 w-max max-w-[220px] transition duration-150 ${
          ALIGNMENT[align] || ALIGNMENT.center
        } ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
