import { create } from "zustand";
import { User, Event } from ".prisma/client";
interface EventModalStore {
  isOpen: boolean;
  isEdit: boolean;
  onOpen: () => void;
  onClose: () => void;
  event?: Event;
  onEdit: (event: Event) => void;
}

const useEventModal = create<EventModalStore>((set) => ({
  isOpen: false,
  isEdit: false,
  onEdit: (event) => set({ isEdit: true, isOpen: true, event }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isEdit: false, event: undefined }),
}));

export default useEventModal;
