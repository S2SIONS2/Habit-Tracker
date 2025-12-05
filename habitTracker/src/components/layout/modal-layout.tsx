import { useModalStore } from "@/store/useModalStore";

export default function ModalLayout() {
    const { isOpen, content, closeModal } = useModalStore();

    if (!isOpen) return null;

    return (
        <div>
            <button onClick={closeModal}>Close</button>
            <div>{content}</div>
        </div>
    )
}