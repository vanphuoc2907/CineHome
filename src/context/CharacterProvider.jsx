import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextCharacters = createContext();

export const CharactersProvider = ({ children }) => {
  const [Characters, setCharacters] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Characters", (charactersList) => {
      setCharacters(charactersList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextCharacters.Provider value={Characters}>
      {children}
    </ContextCharacters.Provider>
  );
};