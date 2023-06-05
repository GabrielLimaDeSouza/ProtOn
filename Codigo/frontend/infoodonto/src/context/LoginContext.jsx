import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession, getUser } from "../services/api";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const recoveredToken = localStorage.getItem("token");

    if (recoveredUser && recoveredToken) {
      (async () => {
        const { data } = await getUser(JSON.parse(recoveredUser)._id);
        setUser(data);
        setLoading(false);
      })();

      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
    } else setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const { data } = await createSession(email, senha);

      const loggedUser = data.user;
      const token = data.token;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const response = await getUser(loggedUser._id);
      setUser(response.data);

      setTimeout(() => {
        navigate("/");
      }, 600);

      return response;
    } catch (err) {
      const { status, data } = err.response;
      return { status, msg: data.msg };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;

    setUser(null);
    navigate("/");
  };

  const updateUser = (newUser) => {
    if (newUser) setUser(newUser);
  };

  return (
    <LoginContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
