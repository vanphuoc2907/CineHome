import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextSubscriptions = createContext();

export const SubscriptionsProvider = ({ children }) => {
  const [subscriptions , setSubscriptions ] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Subscriptions", (subscriptionsList) => {
      setSubscriptions(subscriptionsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);
  
  return (
    <ContextSubscriptions.Provider value={subscriptions}>
      {children}
    </ContextSubscriptions.Provider>
  );
};