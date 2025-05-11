import { EDIT_CHAT_MODAL } from "./constants";

export interface ModalObj {
  modalType?: 
  | typeof EDIT_CHAT_MODAL
  | null;
  modalProps?: object;
  modalTitle?: string;
  showCloseBtn?: boolean;
}

// Chat types
export interface ChatDataInterface {
  id: string;
  user: string;
  message: string;
  isLoading?: boolean;
}

export interface ChatInterface {
  created_at: string;
  id: string;
  title: string;
  updated_at: string;
  user_id: string;
}

export interface ChatResponseInterface {
  chats: ChatInterface[];
}

export interface ChatMessage {
  chat_id: string;
  content: string;
  created_at: string;
  id: string;
  sent_by: "user" | "ai";
  updated_at: string;
}

export interface ChatMessagesResponse {
  chat_id: string;
  messages: ChatMessage[];
}
