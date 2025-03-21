import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextAccounts = createContext();

export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Accounts", (accountsList) => {
      setAccounts(accountsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextAccounts.Provider value={accounts}>
      {children}
    </ContextAccounts.Provider>
  );
};