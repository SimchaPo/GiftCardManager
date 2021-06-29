import axios from "axios";
import qs from "qs";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/use-auth";
import useBlog from "../../hooks/useBlog";

export default function AddComment(props) {
  const formHook = useForm({ mode: "all" });
  const { user } = useAuth();
  const { updatePosts } = useBlog();
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
  } = formHook;
  const onSubmit = (comment) => {
    comment.commentAuthor = user;
    console.log("comment", comment);

    axios
      .post(
        "http://localhost:5000/posts/addcomment/" + props.id,
        qs.stringify(comment),
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
      {!user && <p>Login to add a comment</p>}
      {user && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Form.Label>Add Comment</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              name="commentContent"
              placeholder="Comment.."
              {...register("commentContent", {
                required: "post comment is required",
              })}
              isValid={touchedFields.commentContent && !errors.commentContent}
              isInvalid={!!errors.commentContent}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.commentContent?.message}
            </Form.Control.Feedback>
          </FormGroup>
          <Button type="submit" onClick={() => console.log(errors)}>
            Add
          </Button>
        </Form>
      )}
    </div>
  );
}
