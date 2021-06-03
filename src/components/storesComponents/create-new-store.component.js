import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

function CreateNewStore() {
  const onSubmit = (store) => {
    let form = new FormData();
    form.append("storeName", store.storeName);
    form.append("storeWebsite", store.storeWebsite);
    form.append("storeLogo", store.storeLogo[0]);

    console.log("store", store);
    axios
      .post("http://localhost:5000/stores/addstore", form, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then((res) => console.log("data after add store", res.data))
      .catch((err) => console.log(err));
  };

  const formHook = useForm({ mode: "all" });
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors, touchedFields },
  } = formHook;

  return (
    <div>
      <h3>Create New Store</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Store Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            {...register("storeName", {
              required: "Store Name is required",
            })}
            isValid={touchedFields.storeName && !errors.storeName}
            isInvalid={!!errors.storeName}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.storeName?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Store Website:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Website"
            {...register("storeWebsite", {
              required: "Store Website is required",
            })}
            isValid={touchedFields.storeWebsite && !errors.storeWebsite}
            isInvalid={!!errors.storeWebsite}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.storeWebsite?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Store's Logo:</Form.Label>
          <Form.Control
            type="file"
            {...register("storeLogo", {
              required: "Store's Logo is required",
            })}
            isValid={touchedFields.storeLogo && !errors.storeLogo}
            isInvalid={!!errors.storeLogo}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.storeLogo?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" onClick={() => console.log(getValues())}>
          Create New Store
        </Button>
      </Form>
    </div>
  );
}

export default CreateNewStore;
