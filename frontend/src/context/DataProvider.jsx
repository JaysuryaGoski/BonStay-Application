import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({ userId: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <DataContext.Provider value={{ account, setAccount, isLoggedIn, setIsLoggedIn }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;