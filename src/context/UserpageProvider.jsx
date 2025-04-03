import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextUserpages = createContext();

export const UserpagesProvider = ({ children }) => {
  const [Userpages, setUserpages] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Userpages", (userpagesList) => {
      setUserpages(userpagesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextUserpages.Provider value={Userpages}>
      {children}
    </ContextUserpages.Provider>
  );
};