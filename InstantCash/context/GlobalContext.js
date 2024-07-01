import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [accountAddress, setAccountAddress] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentCollateral, setPaymentCollateral] = useState(0);

  return (
    <AppContext.Provider value={{ 
      accountAddress, 
      setAccountAddress, 
      paymentAmount, 
      setPaymentAmount,
      paymentCollateral, 
      setPaymentCollateral,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};