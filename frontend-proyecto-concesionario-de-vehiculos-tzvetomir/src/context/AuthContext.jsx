import { useState } from "react";
import { AuthContext } from "./authContext.js";
import {
  getStoredToken,
  getStoredUser,
  setStoredAuthSession,
} from "./authStorage.js";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());

  const setAuthSession = ({ token: nextToken, user: nextUser }) => {
    setStoredAuthSession({ token: nextToken, user: nextUser });
    setToken(nextToken || null);
    setUser(nextUser || null);
  };

  const logout = () => {
    setAuthSession({ token: null, user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token),
        setAuthSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
