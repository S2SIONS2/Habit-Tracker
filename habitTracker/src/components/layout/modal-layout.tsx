import { useModalStore } from "@/store/useModalStore";

export default function ModalLayout() {
  const { isOpen, content } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">{content}</div>
    </div>
  );
}
