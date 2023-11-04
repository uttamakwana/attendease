import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  // Retrieve data from local storage on component moun

  // User variables
  const [user, setUser] = useState("");
  const initialTimestamp = JSON.parse(localStorage.getItem("timeStamp")) || {
    inTime: "10:00AM",
    outTime: "5:00PM",
  };

  const initialInTime = localStorage.getItem("inTime") || "10:00AM";
  const initialOutTime = localStorage.getItem("outTime") || "10:00AM";

  // User states
  const [timeStamp, setTimeStamp] = useState(initialTimestamp);

  const [inTime, setInTime] = useState(initialInTime);
  const [outTime, setOutTime] = useState(initialOutTime);

  // User Effects
  useEffect(() => {
    localStorage.setItem("timeStamp", JSON.stringify(timeStamp));
  }, [timeStamp]);
  // const initialUser = JSON.parse(localStorage.getItem("user") || "");
  // const initialData = localStorage.getItem("data") || "";
  // const initialUsers = JSON.parse(localStorage.getItem("users")) || [];
  return (
    <Context.Provider
      value={{
        timeStamp,
        setTimeStamp,
        inTime,
        outTime,
        setInTime,
        setOutTime,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
