import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  trip: [],
  setTrip: () => null,
};

const TripContext = createContext(initialState);

const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState([]);
  const value = {
    trip,
    setTrip,
  };
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined)
    throw new Error("useTrip must be used within a TripProvider");
  return context;
};

export default TripProvider;
