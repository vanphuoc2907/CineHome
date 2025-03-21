import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextActors = createContext();

export const ActorsProvider = ({ children }) => {
  const [Actors, setActors] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Actors", (actorsList) => {
      setActors(actorsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextActors.Provider value={Actors}>
      {children}
    </ContextActors.Provider>
  );
};