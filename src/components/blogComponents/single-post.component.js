import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
// import renderHTML from "react-render-html";

export default function SinglePost(props) {
  const [post, setPost] = useState();
  const postId = props.match.params.postId;
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/getpostbyid/" + postId)
      .then((res) => setPost(res.data));
  }, [postId]);
  const showPost = (props) => {
    if (!post) return null;

    const { postTitle, postAuthor, postContent, createdAt } = post;

    return (
      <Fragment>
        <Paper className="single_post">
          <h4>Title: {postTitle}</h4>
          <Divider light />
          <p>
            <b>Autor:</b> {postAuthor}
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
