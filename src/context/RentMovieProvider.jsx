import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextRentMovies = createContext();

export const RentMoviesProvider = ({ children }) => {
  const [rentMovies , setRentMovies ] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("RentMovies", (rentMoviesList) => {
      setRentMovies(rentMoviesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);
  console.log(rentMovies);
  
  return (
    <ContextRentMovies.Provider value={rentMovies}>
      {children}
    </ContextRentMovies.Provider>
  );
};