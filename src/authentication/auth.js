import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

function Auth() {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/getcuruser", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function login(user, cb) {
    axios
      .post("http://localhost:5000/users/login", qs.stringify(user), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("res.data", res.data.user);
        if (res.data) {
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log(err));
    cb();
  }

  function logout(cb) {
    console.log("logout clicked");
    axios
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
    cb();
  }

  function isAuthenticated() {
    console.log("isAuthenticated", user ? true : false);
    return user ? true : false;
  }

  return { user, login, logout, isAuthenticated };
}

export default Auth;
