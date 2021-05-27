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
      .catch((err) => console.log("login error", err));
  };
  const update = (updatedUser) => {
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
      .catch((err) => console.log(err));
  };
  const logout = () => {
    console.log("logout clicked");
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
      .catch((err) => console.log(err));
  };

  async function getCurrentUser() {
    const res = await axios
      .get("http://localhost:5000/users/getcuruser", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    console.log(res.data);
    return res.data;
  }
  useEffect(() => {
    console.log("use effect");
    const getAndSetUser = async () => {
      const curUser = await getCurrentUser();
      if (await curUser) {
        setUser(curUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    getAndSetUser();
  }, []);
  return {
    user,
    loading,
    update,
    login,
    logout,
  };
}
