import React, { createContext, useContext } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children, value }) => {
    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export const useAccount = () => useContext(LoginContext);