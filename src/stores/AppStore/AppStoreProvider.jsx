import React, { createContext, useContext, useEffect } from "react";
import { SeminarsStore } from "./SeminarsStore";

const SeminarsContext = createContext(null);

export const SeminarsProvider = ({ children }) => {
  useEffect(() => {
    SeminarsStore.fetchSeminars();
  }, []);

  return (
    <SeminarsContext.Provider value={SeminarsStore}>
      {children}
    </SeminarsContext.Provider>
  );
};

export const useSeminarsStore = () => {
  const context = useContext(SeminarsContext);
  if (!context) {
    throw new Error("useSeminarsStore must be used within a SeminarsProvider");
  }
  return context;
};
