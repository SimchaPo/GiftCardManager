import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../authentication/use-auth";
import date from "date-and-time";
import { showNotification } from "../swDev";
import useSocket from "./useSocket";
import axios from "axios";

const blogContext = createContext();

export function ProvideBlog({ children }) {
  const blog = useProvideBlog();
  return <blogContext.Provider value={blog}>{children}</blogContext.Provider>;
}

export const useBlog = () => {
  return useContext(blogContext);
};

const CHANGE_POST_EVENT = "changePost";

function useProvideBlog() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const { socketRef } = useSocket();
  const getPosts = () => {
    console.log("getPosts");
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        console.log("res", res);
        if (res.data.length > 0) {
          setPosts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("posts", posts);
    socketRef.current?.on(CHANGE_POST_EVENT, () => {
      getPosts();
    });
  }, [socketRef.current]);
  useEffect(() => {
    getPosts();
  }, []);

  const updatePosts = () => {
    console.log("update");
    socketRef.current.emit(CHANGE_POST_EVENT);
  };

  return {
    posts,
    updatePosts,
  };
}

export default useBlog;
