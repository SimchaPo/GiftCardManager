import React, { useEffect, useState } from "react";
import moment from "moment";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import ThumbDownAltTwoToneIcon from "@material-ui/icons/ThumbDownAltTwoTone";
import CommentTwoToneIcon from "@material-ui/icons/CommentTwoTone";
import { Badge } from "@material-ui/core";

import axios from "axios";
import AddComment from "./add-comment.component";
import CommentsList from "./comments-list.component";
import { useAuth } from "../../authentication/use-auth";
import qs from "qs";
import useBlog from "../../hooks/useBlog";
import { Card } from "react-bootstrap";

function HandleLikes(props) {
  const { updatePosts } = useBlog();
  const [like, setLike] = useState("");
  const [dislike, setDislike] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    (props.post.likes.includes(user._id) && setLike("green")) ||
      (props.post.dislikes.includes(user._id) && setDislike("red"));
  }, [props.post.dislikes, props.post.likes, user._id]);
  const likeClick = () => {
    if (like === "") {
      if (dislike === "red") {
        sendToApi("removedislike/");
        setDislike("");
      }
      sendToApi("addlike/");
      setLike("green");
    } else {
      sendToApi("removelike/");
      setLike("");
    }
  };
  const dislikeClick = () => {
    if (dislike === "") {
      if (like === "green") {
        sendToApi("removelike/");
        setLike("");
      }
      sendToApi("adddislike/");
      setDislike("red");
    } else {
      sendToApi("removedislike/");
      setDislike("");
    }
  };
  const sendToApi = (url) => {
    console.log(url);
    axios
      .post(
        "http://localhost:5000/posts/" + url + props.id,
        qs.stringify(user),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        updatePosts();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <ThumbUpAltTwoToneIcon
        onClick={likeClick}
        style={{
          cursor: "pointer",
          color: like,
        }}
      />
      <ThumbDownAltTwoToneIcon
        onClick={dislikeClick}
        style={{
          cursor: "pointer",
          color: dislike,
        }}
      />
    </div>
  );
}
export default function SinglePost(props) {
  const { posts } = useBlog();
  const [post, setPost] = useState(null);
  console.log("SinglePost", props);
  const { user } = useAuth();
  const postId = props.match.params.postId;
  useEffect(() => {
    setPost(posts.find((post) => post._id === postId));
  }, [postId, posts]);

  console.log(post);
  return (
    <div>
      <h3>Post</h3>
      {post && (
        <>
          <Card bg="secondary" text="white">
            <Card.Header>
              {post.postTitle}
              <div style={{ float: "right" }}>
                <Badge color="primary" badgeContent={post.comments.length}>
                  <CommentTwoToneIcon />
                </Badge>
                {" | "}
                <Badge color="error" badgeContent={post.likes.length}>
                  <ThumbUpAltTwoToneIcon />
                </Badge>
                {" | "}
                <Badge color="secondary" badgeContent={post.dislikes.length}>
                  <ThumbDownAltTwoToneIcon />
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Header>
                <Card.Title>{post.postAuthor.userName}</Card.Title>
                <Card.Subtitle className="mb-2 text-white-50">
                  {moment(post.createdAt).format("DD MM YYYY")}
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>{post.postContent}</Card.Text>
              </Card.Body>
              {user && (
                <Card.Footer className="text-center bg-light text-dark">
                  <HandleLikes id={postId} post={post} />
                </Card.Footer>
              )}
            </Card.Body>
            <Card.Footer>
              <Card.Header>Comments</Card.Header>
              <Card.Body>
                <AddComment id={postId} />
              </Card.Body>
              <CommentsList comments={post.comments} />
            </Card.Footer>
          </Card>
        </>
      )}
    </div>
  );
}
