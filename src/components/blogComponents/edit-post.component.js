import axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function EditPost(props) {
  const formHook = useForm({ mode: "all" });
  const {
    register,
    formState: { touchedFields, errors },
    setValue,
    handleSubmit,
  } = formHook;
  const [postToUpdate, setPostToUpdate] = useState({});
  const postId = props.match.params.postId;

  useEffect(() => {
    console.log("id:", postId);
    axios
      .get("http://localhost:5000/posts/getpostbyid/" + postId)
      .then((res) => setPostToUpdate(res.data));
  }, [postId]);
  useEffect(() => {
    console.log(postToUpdate);
    setValue("postTitle", postToUpdate.postTitle);
    setValue("postContent", postToUpdate.postContent);
    setValue("postAuther", postToUpdate.postAuther);

    setValue("createdAt", postToUpdate.createdAt);
  }, [postToUpdate, setValue]);
  const onSubmit = (updatedPost) => {
    updatedPost._id = postToUpdate._id;
    console.log("post to update", updatedPost);
    axios
      .post(
        "http://localhost:5000/posts/update/" + postId,
        qs.stringify(updatedPost),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const loadForm = () => {
    if (!postToUpdate) return null;

    return (
      <Form onSubmit={handleSubmit(onSubmit)} className="col-md-10">
        <legend className="text-center">Edit Post</legend>

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
          Save changes
        </Button>
      </Form>
    );
  };

  return <React.Fragment>{loadForm()}</React.Fragment>;
}
