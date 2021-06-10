import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { Button, Form, FormGroup } from "react-bootstrap";
import UserTemplate from "../usersComponents/user-template.component";
import { useForm } from "react-hook-form";
import Select from "react-select";
import ROLE from "../../roles.enum";

export default function EditUser(props) {
  const [userToUpdate, setUserToUpdate] = useState({});
  const userId = props.match.params.id;
  const formHook = useForm({ mode: "all" });
  const roleOptions = ROLE.map((r) => ({ value: r, label: r }));
  const {
    register,
    formState: { touchedFields, errors },
    setValue,
    watch,
    handleSubmit,
  } = formHook;
  useEffect(() => {
    console.log("id:", userId);
    axios
      .get("http://localhost:5000/users/getuserbyid/" + userId)
      .then((res) => setUserToUpdate(res.data));
  }, [userId]);
  useEffect(() => {
    console.log(userToUpdate);
    setValue("userName", userToUpdate.userName);
    setValue("email", userToUpdate.email);
    setValue("address", userToUpdate.address);

    setValue("country", userToUpdate.country);
    setValue("zip", userToUpdate.zip);
    setValue("city", userToUpdate.city);
    setValue("userType", userToUpdate.userType);
  }, [userToUpdate, setValue]);
  const onSubmit = (updatedUser) => {
    if (!updatedUser.password) updatedUser.password = userToUpdate.password;
    updatedUser._id = userToUpdate._id;
    console.log("user to update", updatedUser);
    axios
      .post(
        "http://localhost:5000/users/update/" + userId,
        qs.stringify(updatedUser),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Form.Label>User Type</Form.Label>
        <Form.Control
          as={Select}
          value={roleOptions.filter((r) => r.value === watch("userType"))}
          name="userType"
          placeholder="User Type"
          onChange={(selectedType) => {
            console.log("changed", selectedType);

            setValue("userType", selectedType.label);
            console.log("changed", watch("userType"));
          }}
          options={roleOptions}
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
      <UserTemplate passwordReq={{ required: false }} {...formHook} />

      <Button
        type="submit"
        variant="primary"
        onClick={() => console.log("clicked")}
      >
        Edit
      </Button>
    </Form>
  );
}
