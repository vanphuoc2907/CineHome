import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextPackages = createContext();

export const PackagesProvider = ({ children }) => {
  const [Packages, setPackages] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Packages", (PackagesList) => {
      setPackages(PackagesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPackages.Provider value={Packages}>
      {children}
    </ContextPackages.Provider>
  );
};