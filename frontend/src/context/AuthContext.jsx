import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { api, clearToken, setToken } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("carbonwise_token")));

  useEffect(() => {
    if (!localStorage.getItem("carbonwise_token")) return;
    api
      .me()
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  async function login(payload) {
    const token = await api.login(payload);
    setToken(token.access_token);
    const profile = await api.me();
    setUser(profile);
    return profile;
  }

  async function register(payload) {
    await api.register(payload);
    return login({ email: payload.email, password: payload.password });
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, register, logout, setUser }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
