import { createContext, useEffect, useState } from 'react';
import { domain } from '../utils/utils';
import axios from 'axios';
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const logUser = async (data) => {
    try {
        const res = await axios.post(`${domain}/auth/login`, data);
        setUser(res.data);
    } catch (error) {
        alert(error.message)
    }
    
  };
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <Context.Provider value={{ user, logUser }}>{children}</Context.Provider>
  );
};
