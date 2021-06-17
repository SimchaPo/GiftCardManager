import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
// import renderHTML from "react-render-html";

export default function SinglePost(props) {
  const [post, setPost] = useState();
  console.log(props);

  const postId = props.match.params.postId;
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/getpostbyid/" + postId)
      .then((res) => setPost(res.data));
  }, [postId]);
  const showPost = (props) => {
    if (!post) return null;

    const { postTitle, postAutor, postContent, createdAt } = post;
    console.log(post);
    return (
      <Fragment>
        <Paper className="single_post">
          <h4>Title: {postTitle}</h4>
          <Divider light />
          <p>
            <b>Autor:</b> {postAutor.userName}
          </p>
          <Divider light />
          <p>
            <b>Content:</b> {postContent}
          </p>
          <Divider light />
          <h5>Create At: {moment(createdAt).format("DD MM YYYY")}</h5>
          {/* <div style={{ width: "60%" }}>{renderHTML(postContent)}</div> */}
        </Paper>
      </Fragment>
    );
  };
  return <div className=" col-md-10">{showPost(props)}</div>;
}
