'use client';
type NotificationModalProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

const NotificationModal = ({ message, isOpen, onClose }: NotificationModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixd insert-0 bg--black/50 flex--center justify-center z-50">
      <div className="bg-white reouended p-6 shadow-lg min-w-[250px]">
        <p className="mb-4 text-center ">{message}</p>
        <button className="bg-blue-600 text-white p-2 rounded w-full" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};
export default NotificationModal;
