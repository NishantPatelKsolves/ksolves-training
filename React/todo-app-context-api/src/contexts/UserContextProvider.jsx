import React, { useState } from "react";
import UserContext from "./UserContext";

export const UserContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  return (
    <UserContext.Provider value={{todos, setTodos}}>
      {children}
    </UserContext.Provider>
  );
};
