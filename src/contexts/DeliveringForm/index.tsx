import React, { useContext, useState, createContext, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const DeliveringFormStatusContext = createContext({ next: false, setNext: (status: boolean) => {} });

export const DeliveringFormStatusProvider: FC<Props> = ({ children }) => {
  const [next, setNext] = useState(false);

  return (
    <DeliveringFormStatusContext.Provider value={{ next, setNext }}>
      { children }
    </DeliveringFormStatusContext.Provider>
  );

};

export const useDeliveringFormStatusContext = () => useContext(DeliveringFormStatusContext);
