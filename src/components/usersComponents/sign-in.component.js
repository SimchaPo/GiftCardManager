import React from "react";
import axios from "axios";
import qs from "qs";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import UserTemplate from "../user-template";

export default function SignIn() {
  const onSubmit = (user) => {
    console.log(user);
    axios
      .post("http://localhost:5000/users/adduser", qs.stringify(user), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const formHook = useForm({ mode: "all" });
  const { handleSubmit, getValues } = formHook;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <UserTemplate {...formHook} />
      <Button type="submit" onClick={() => console.log(getValues())}>
        Sign In
      </Button>
    </Form>
  );
}
