import React from "react";
import Swal from "sweetalert2";
import "./Post.css";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useAuth } from "../../authentication/use-auth";
import ROLE from "../../roles.enum";
import { Card } from "react-bootstrap";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import ThumbDownAltTwoToneIcon from "@material-ui/icons/ThumbDownAltTwoTone";
import CommentTwoToneIcon from "@material-ui/icons/CommentTwoTone";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Post(props) {
  const { user } = useAuth();
  console.log(props.info);
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

  const { _id, postTitle, postContent, comments, likes, dislikes, createdAt } =
    props.info;
  console.log(props.info);

  return (
    <div>
      <Card
        className="text-center m-2"
        style={{ minWidth: "18rem", maxWidth: "18rem" }}
      >
        <Card.Header>
          <div style={{ float: "left" }}>
            {postTitle.length > 25
              ? `${postTitle.substr(0, 25)}...`
              : postTitle}
          </div>
          <div style={{ float: "right" }}>
            <Badge color="primary" badgeContent={comments.length}>
              <CommentTwoToneIcon />
            </Badge>
            {" | "}
            <Badge color="error" badgeContent={likes.length}>
              <ThumbUpAltTwoToneIcon />
            </Badge>
            {" | "}
            <Badge color="secondary" badgeContent={dislikes.length}>
              <ThumbDownAltTwoToneIcon />
            </Badge>
          </div>
        </Card.Header>
        <Card.Body style={{ height: "334px" }}>
          <Card.Title>{props.info.postAuthor.userName}</Card.Title>
          <Card.Text style={{ height: "216px" }}>
            {postContent.length > 300
              ? `${postContent.substr(0, 300)}...`
              : postContent}
          </Card.Text>
          <Card.Link as={Link} to={`/post/${_id}`} className="btn btn-primary">
            Show
          </Card.Link>
          {(user?.userType === ROLE[0] ||
            user?._id === props.info.postAuthor._id) && (
            <>
              <Card.Link
                as={Link}
                to={`/editpost/${_id}`}
                className="btn btn-warning"
              >
                Edit
              </Card.Link>

              <Card.Link
                as={Button}
                onClick={confirmDeletion}
                className="btn btn-danger"
              >
                Delete
              </Card.Link>
            </>
          )}
        </Card.Body>

        <Card.Footer className="text-muted">
          {moment(createdAt).fromNow()}
        </Card.Footer>
      </Card>
    </div>
  );
}
