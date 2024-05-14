import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

    const [vehicleType, setVehicleType] = useState("")
    const [goods, setGoods] = useState("")
    const [weight, setWeight] = useState("")
    const [paymentMode, setPaymentMode] = useState("")

    const [phoneNumber, setPhoneNumber] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useState()

    const [date, setDate] = useState(new Date());
    const [pickUpLocation, setPickUpLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');


    const [totalBids, setTotalBids] = useState([])

    return (
        <MyContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            phoneNumber,
            setPhoneNumber,
            selectedFile,
            setSelectedFile,
            user,
            setUser,
            date, setDate,
            pickUpLocation, setPickUpLocation,
            dropLocation, setDropLocation,
            vehicleType, setVehicleType,
            goods, setGoods,
            weight, setWeight,
            paymentMode, setPaymentMode,
            totalBids, setTotalBids
        }}>
            {children}
        </MyContext.Provider>
    );
};
