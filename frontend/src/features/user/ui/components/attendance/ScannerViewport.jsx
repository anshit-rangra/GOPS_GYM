const CORNERS = [
  "left-3 top-3 border-l-2 border-t-2 rounded-tl-lg",
  "right-3 top-3 border-r-2 border-t-2 rounded-tr-lg",
  "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg",
  "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg",
];

const ScannerViewport = ({ children, hint, scanning = false }) => (
  <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-line bg-night-soft">
    {CORNERS.map((position) => (
      <span
        key={position}
        aria-hidden="true"
        className={`absolute h-7 w-7 border-volt ${position}`}
      />
    ))}

    {scanning && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-1/2 h-0.5 animate-scan-sweep rounded-full bg-volt/80"
      />
    )}

    <div className="absolute inset-0 grid place-items-center p-6 text-center">
      {children}
    </div>

    {hint && (
      <p className="absolute inset-x-4 bottom-4 text-center text-[11px] text-muted">
        {hint}
      </p>
    )}
  </div>
);

export default ScannerViewport;
