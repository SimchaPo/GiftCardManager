import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, withRouter } from "react-router-dom";
import { useAuth } from "../../authentication/use-auth.js";

function LogIn(props) {
  const auth = useAuth();
  const {
    register,
    setError,
    formState: { errors, touchedFields },
    handleSubmit,
  } = useForm({
    mode: "all",
  });
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);

    auth
      .login(data)
      .then(history.push("/"))
      .catch((err) => {
        const formError = {
          type: "server",
          message: "Username or Password Incorrect",
        };
        setError("password", formError);
        setError("email", formError);
      });
  };
  return (
    <div>
      <h3>Login</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>User Email</Form.Label>
          <Form.Control
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email"
            isValid={touchedFields.email && !errors.email}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: "Password is too short" },
              maxLength: { value: 10, message: "Password is too long" },
            })}
            type="password"
            placeholder="Password"
            isValid={touchedFields.password && !errors.password}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Log In</Button>
      </Form>
    </div>
  );
}

export default withRouter(LogIn);
