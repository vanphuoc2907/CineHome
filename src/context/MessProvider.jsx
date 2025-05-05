import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextMessages = createContext();

export const MessagesProvider = ({ children }) => {
  const [Messages, setMessages] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Messages", (messagesList) => {
      setMessages(messagesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextMessages.Provider value={Messages}>
      {children}
    </ContextMessages.Provider>
  );
};