import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import qs from "qs";

function Auth() {
  const [user, setUser] = useState();

  const updateUser = useCallback(
    (updatedUser) => {
      if (user)
        axios
          .post(
            "http://localhost:5000/users/update/" + user._id,
            qs.stringify(updatedUser),
            {
              headers: {
                "content-type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => console.log("updated user", res.data))
          .catch((err) => console.log(err));
    },
    [user]
  );
  useEffect(() => {
    (async () => {
      setUser(await getCurrentUser());
    })();
  }, [updateUser]);

  async function getCurrentUser() {
    const res = await axios
      .get("http://localhost:5000/users/getcuruser", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    console.log(res.data);
    return res.data;
  }
  function login(user, cb) {
    axios
      .post("http://localhost:5000/users/login", qs.stringify(user), {
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
          cb();
        }
      })
      .catch((err) => console.log("login error", err));
    //(async () => {
    //  setUser(await getCurrentUser());
    //})();
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
    //(async () => {
    //  setUser(await getCurrentUser());
    //})();
    cb();
  }

  function isAuthenticated() {
    return user ? true : false;
  }

  return { user, login, logout, updateUser, isAuthenticated };
}

export default Auth;
