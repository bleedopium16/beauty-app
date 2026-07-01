import { createContext, useContext, useEffect, useState } from "react";
import { authApi, setToken, clearToken, getToken } from "../api";

// AuthContext lets ANY component read the logged-in user and call
// login / register / logout, without passing props down through every level.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we check existing token

  // On first load, if there's a saved token, fetch the user it belongs to.
  // This is what keeps someone logged in after a page refresh.
  useEffect(() => {
    async function loadUser() {
      if (getToken()) {
        try {
          const me = await authApi.me();
          setUser(me);
        } catch {
          clearToken(); // token was invalid/expired — drop it
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  async function login(email, password) {
    const { token, user } = await authApi.login(email, password);
    setToken(token);
    setUser(user);
  }

  async function register(name, email, password) {
    const { token, user } = await authApi.register(name, email, password);
    setToken(token);
    setUser(user);
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Small convenience hook so components can do: const { user } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
