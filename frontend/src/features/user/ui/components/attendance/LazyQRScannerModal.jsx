import { lazy, Suspense } from "react";

const QRScannerModal = lazy(() => import("./QRScannerModal"));

const LazyQRScannerModal = (props) => {
  if (!props.open) return null;

  return (
    <Suspense fallback={null}>
      <QRScannerModal {...props} />
    </Suspense>
  );
};

export default LazyQRScannerModal;
