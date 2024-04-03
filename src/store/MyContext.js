import React, { createContext, useState } from 'react';

export const USER_TYPES = {
    DRIVER: 'driver',
    DEALER: 'dealer',
};

export const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);

    const setUserAsDriver = () => setUserType(USER_TYPES.DRIVER);
    const setUserAsDealer = () => setUserType(USER_TYPES.DEALER);

    return (
        <UserTypeContext.Provider value={{ userType, setUserAsDriver, setUserAsDealer }}>
            {children}
        </UserTypeContext.Provider>
    );
};
