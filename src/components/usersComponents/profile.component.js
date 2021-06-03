import React, { useEffect } from "react";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../../authentication/use-auth.js";
import UserTemplate from "./user-template.component";
import { useForm } from "react-hook-form";

function Profile(props) {
  const auth = useAuth();

  const formHook = useForm({ mode: "all" });
  const { setValue, getValues, handleSubmit } = formHook;
  const onSubmit = (user) => {
    console.log("user", user);
    if (!user.password) user.password = auth.user.password;
    user._id = auth.user._id;
    auth.update(user);
  };
  useEffect(() => {
    setValue("userName", auth.user.userName);
    setValue("email", auth.user.email);
    setValue("address", auth.user.address);

    setValue("country", auth.user.country);
    setValue("zip", auth.user.zip);
    setValue("city", auth.user.city);
  }, [auth.user, setValue]);
  useEffect(() => {
    console.log("values", getValues());
  }, [getValues]);
  return (
    <Accordion defaultActiveKey="0">
      <Card className="text-center bg-secondary text-white">
        <Card.Header>Profile</Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Card.Title>
              {"Name: "}
              {auth.user.userName}
            </Card.Title>
            <Card.Text>
              {"Email: "}
              {auth.user.email}
            </Card.Text>
            <Card.Text>
              {"Address: "}
              {auth.user.address}
            </Card.Text>
            <Card.Text>
              {"City: "}
              {auth.user.city}
            </Card.Text>
            <Card.Text>
              {"Country: "}
              {auth.user.country}
            </Card.Text>
            <Card.Text>
              {"Zip: "}
              {auth.user.zip}
            </Card.Text>
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer>
          <Accordion.Toggle as={Button} variant="light" eventKey="0">
            Profile
          </Accordion.Toggle>
        </Card.Footer>
      </Card>
      <Card className="text-center bg-secondary text-white">
        <Accordion.Collapse eventKey="1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <UserTemplate passwordReq={{ required: false }} {...formHook} />
            <Button
              type="submit"
              variant="primary"
              onClick={() => console.log("clicked")}
            >
              Edit
            </Button>
          </Form>
        </Accordion.Collapse>
        <Card.Footer>
          <Accordion.Toggle as={Button} variant="light" eventKey="1">
            Update
          </Accordion.Toggle>
        </Card.Footer>
      </Card>
    </Accordion>
  );
}

export default Profile;
