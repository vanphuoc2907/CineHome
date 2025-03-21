import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextPlans = createContext();

export const PlansProvider = ({ children }) => {
  const [Plans, setPlans] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Plans", (PlansList) => {
      setPlans(PlansList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPlans.Provider value={Plans}>
      {children}
    </ContextPlans.Provider>
  );
};