import { EDIT_CHAT_MODAL } from "./constants";

export interface ModalObj {
  modalType?: 
  | typeof EDIT_CHAT_MODAL
  | null;
  modalProps?: object;
  modalTitle?: string;
  showCloseBtn?: boolean;
}
