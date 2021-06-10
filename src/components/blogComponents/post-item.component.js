import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Post.css";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Button } from "react-bootstrap";

export default function Post(props) {
  const confirmDeletion = () => {
    const { _id } = props.info;

    Swal.fire({
      title: "Delete this one?",
      text: "This action can not be canceled!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.value) {
        props.deletePost(_id);
        Swal.fire("Press OK to back", "The post has been deleted", "success");
      }
    });
  };

  const { _id, postTitle, postContent, createdAt } = props.info;
  console.log(props.info);

  return (
    <Paper className="post">
      <p className="post_title" cols="10">
        <b>
          <span className="post-preview">
            {postTitle.length > 25
              ? `${postTitle.substr(0, 25)}...`
              : postTitle}
          </span>
        </b>
      </p>
      <Divider light />
      <p className="post_body">
        <span className="post-preview">
          {postContent.length > 300
            ? `${postContent.substr(0, 300)}...`
            : postContent}
        </span>
      </p>
      <Divider light />
      <p className="post_datestamp">
        <b>{moment(createdAt).fromNow()}</b>
      </p>
      <div className="post_button">
        <ul className="buttons">
          <li>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              {" "}
              Show{" "}
            </Link>
          </li>
          <li>
            <Link to={`/editpost/${_id}`} className="btn btn-warning">
              {" "}
              Edit{" "}
            </Link>
          </li>
          <li>
            <Button onClick={confirmDeletion} className="btn btn-danger">
              Delete
            </Button>
          </li>
        </ul>
      </div>
    </Paper>
  );
}
