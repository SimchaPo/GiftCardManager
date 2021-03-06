import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import qs from "qs";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useAuth } from "../../hooks/use-auth";
import useBlog from "../../hooks/useBlog";

export default function CreatePost(props) {
  const formHook = useForm({ mode: "all" });
  const { user } = useAuth();
  const { updatePosts } = useBlog();
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
  } = formHook;
  const onSubmit = (post) => {
    post.postAuthor = user;
    console.log("post", post);
    console.log("post.postAuthor", post.postAuthor);
    console.log("user", user);

    axios
      .post("http://localhost:5000/posts/addpost", qs.stringify(post), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        updatePosts();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3 className="text-center">Create New Post</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="col-md-10">
        <FormGroup>
          <Form.Label>Title for the Post:</Form.Label>
          <Form.Control
            type="text"
            name="postTitle"
            placeholder="Title.."
            {...register("postTitle", {
              required: "postTitle is required",
            })}
            isValid={touchedFields.postTitle && !errors.postTitle}
            isInvalid={!!errors.postTitle}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.postTitle?.message}
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            rows={7}
            cols={25}
            name="postContent"
            placeholder="Here write your content.."
            {...register("postContent", {
              required: "postContent is required",
            })}
            isValid={touchedFields.postContent && !errors.postContent}
            isInvalid={!!errors.postContent}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.postContent?.message}
          </Form.Control.Feedback>
        </FormGroup>
        <Button type="submit" onClick={() => console.log(errors)}>
          Create
        </Button>
      </Form>
    </div>
  );
}
