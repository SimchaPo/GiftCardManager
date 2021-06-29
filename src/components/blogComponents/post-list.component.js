import axios from "axios";
import React from "react";
import { CardGroup } from "react-bootstrap";
import useBlog from "../../hooks/useBlog";
import Post from "./post-item.component";

export default function Listing(props) {
  const { posts, updatePosts } = useBlog();
  const deletePost = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:5000/posts/delete/" + id)
      .then((res) => {
        console.log(res.data);
        updatePosts();
      })
      .catch((err) => console.log(err));
  };

  const showPosts = () => {
    if (posts.length === 0) return null;
    return (
      <CardGroup
        style={{
          justifyContent: "center",
        }}
      >
        {Object.keys(posts).map((post) => (
          <Post key={post} info={posts[post]} deletePost={deletePost} />
        ))}
      </CardGroup>
    );
  };

  return (
    <div>
      <h3>Post Listing Page</h3>
      <div>{showPosts()}</div>
    </div>
  );
}
