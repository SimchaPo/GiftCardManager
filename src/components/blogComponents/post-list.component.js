import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Post from "./post-item.component";
import "./Post.css";

export default function Listing(props) {
  const [posts, setPosts] = useState([]);
  const deletePost = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:5000/posts/delete/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setPosts(posts.filter((el) => el._id !== id));
  };
  useEffect(() => {
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
  }, []);
  const showPosts = () => {
    if (posts.length === 0) return null;
    return (
      <form className="col-md-10">
        <legend className="text-center">Post Listing Page</legend>
        <div className="post_list_item">
          <Fragment>
            {Object.keys(posts).map((post) => (
              <Post key={post} info={posts[post]} deletePost={deletePost} />
            ))}
          </Fragment>
        </div>
      </form>
    );
  };

  return <div className="post_list">{showPosts()}</div>;
}
