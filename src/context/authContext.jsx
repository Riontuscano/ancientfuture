import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    localStorage.getItem("auth-cred") ? JSON.parse(localStorage.getItem("auth-cred")) : null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
