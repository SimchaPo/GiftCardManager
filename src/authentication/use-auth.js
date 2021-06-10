import axios from "axios";
import qs from "qs";
import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userInfo) => {
    setLoading(true);
    return axios
      .post("http://localhost:5000/users/login", qs.stringify(userInfo), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("login res", res);
        console.log("res.data", res.data.user);
        if (res.data) {
          setUser(res.data.user);
          return res.data.user;
        }
      })
      .catch((err) => console.log("login error", err))
      .finally(() => setLoading(false));
  };
  const update = (updatedUser) => {
    setLoading(true);
    return axios
      .post(
        "http://localhost:5000/users/update/" + user._id,
        qs.stringify(updatedUser),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log("updated user", res.data);
        setUser(res.data.user);
        return res.data.user;
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const logout = () => {
    console.log("logout clicked");
    setLoading(true);
    return axios
      .get("http://localhost:5000/users/logout", {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    console.log("use effect");
    setLoading(true);
    axios
      .get("http://localhost:5000/users/getcuruser", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res.data", res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  return {
    user,
    loading,
    update,
    login,
    logout,
  };
}
