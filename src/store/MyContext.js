import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

    const [phoneNumber, setPhoneNumber] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    return (
        <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated, phoneNumber, setPhoneNumber }}>
            {children}
        </MyContext.Provider>
    );
};
