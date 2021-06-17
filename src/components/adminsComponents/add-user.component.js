import axios from "axios";
import qs from "qs";
import React from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Select from "react-select";
import ROLE from "../../roles.enum";
import UserTemplate from "../usersComponents/user-template.component";

export default function CreateNewUser() {
  const formHook = useForm({ mode: "all" });
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    setValue,
  } = formHook;
  const onSubmit = (user) => {
    console.log("data", user);
    axios
      .post("http://localhost:5000/users/adduser", qs.stringify(user), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Form.Label>User Type</Form.Label>
        <Form.Control
          className="form-control-select"
          as={Select}
          name="userType"
          placeholder="User Type"
          onChange={(selectedType) => {
            setValue("userType", selectedType.value);
          }}
          options={ROLE.map((r) => ({ value: r, label: r }))}
          ref={() => ({
            ...register("userType", {
              required: "userType is required",
            }),
          })}
          isValid={touchedFields.userType && !errors.userType}
          isInvalid={!!errors.userType}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.userType?.message}
        </Form.Control.Feedback>
      </FormGroup>
      <UserTemplate {...formHook} />

      <Button type="submit" onClick={() => console.log(errors)}>
        Create
      </Button>
    </Form>
  );
}
