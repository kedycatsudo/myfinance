// ConfirmModal.tsx
type ConfirmModalProps = {
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ message, isOpen, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 shadow-lg min-w-[250px]">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex gap-3 justify-center">
          <button className="bg-red-600 text-white p-2 rounded" onClick={onCancel}>
            Cancel
          </button>
          <button className="bg-green-600 text-white p-2 rounded" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
