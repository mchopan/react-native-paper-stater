import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

    const [phoneNumber, setPhoneNumber] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useState()

    return (
        <MyContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            phoneNumber,
            setPhoneNumber,
            selectedFile,
            setSelectedFile,
            user,
            setUser
        }}>
            {children}
        </MyContext.Provider>
    );
};
