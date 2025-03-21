import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextFeatures = createContext();

export const FeaturesProvider = ({ children }) => {
  const [Features, setFeatures] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Features", (FeaturesList) => {
      setFeatures(FeaturesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextFeatures.Provider value={Features}>
      {children}
    </ContextFeatures.Provider>
  );
};