import * as React from "react";
import { Navigate } from "react-router-dom";

const authContext = React.createContext(null);

export function useAuthContext() {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
export function RequireAuthentication({ children }) {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
export function useUser() {
  const { token } = useAuthContext();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (!token) return;
    fetch("/api/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((res) => {
        setUser(res?.user);
      });
  }, [token]);
  return user;
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState(null);

  function login(email, password) {
    return fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        console.log({ res });
        if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(true);
        setToken(data.token);
        return data;
      });
  }
  function logout() {
    setIsLoggedIn(false);
    setToken(null);
  }
  return (
    <authContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

