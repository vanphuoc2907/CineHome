import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextTrailers = createContext();

export const TrailersProvider = ({ children }) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Trailers", (TrailersList) => {
      setTrailers(TrailersList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextTrailers.Provider value={trailers}>
      {children}
    </ContextTrailers.Provider>
  );
};