import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

type Props = {
  onSubmit: Function;
};

const Login = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  return (
    <Form onSubmit={() => onSubmit(name)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="Enter name"
        />
        <Form.Text className="text-muted">
          Enter the student name to get started!
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
