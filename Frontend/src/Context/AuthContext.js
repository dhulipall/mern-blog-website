import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../API";

export const AuthContext = React.createContext();

const AuthContextProvider = props => {

  const [activeUser, setActiveUser] = useState({})
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
  })


  useEffect(() => {

    const controlAuth = async () => {
      try {
        const { data } = await axios.get(API_URL+ "/auth/private", config);
        setActiveUser(data.user)
      }
      catch (error) {

        // localStorage.removeItem("authToken");

        // setActiveUser({})
      }
    };
    controlAuth()

  }, [])

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
