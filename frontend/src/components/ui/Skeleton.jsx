const Skeleton = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-lg bg-panel-2 ${className}`}
  />
);

export default Skeleton;
