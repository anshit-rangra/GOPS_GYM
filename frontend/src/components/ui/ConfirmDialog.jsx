import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  tone = "danger",
  onConfirm,
  onClose,
}) => (
  <Modal
    open={open}
    onClose={loading ? () => {} : onClose}
    size="sm"
    title={title}
    description={description}
    footer={
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="night" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={tone === "danger" ? "danger" : "accent"}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    }
  >
    <p className="text-sm text-muted">{description}</p>
  </Modal>
);

export default ConfirmDialog;
