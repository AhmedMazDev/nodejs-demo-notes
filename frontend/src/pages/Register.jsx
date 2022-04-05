import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { reset, register } from "../features/auth/authSlice";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const { username, email, password, repeatedPassword } = form;

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user || isSuccess) {
      toast.success("Account Successfuly Created");
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatedPassword) {
      toast.error("passwords dont match");
    } else {
      const userData = {
        name: username,
        email,
        password,
        repeatPassword: repeatedPassword,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      <h1 className="text-center m-3">Register : </h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={username}
            onChange={onChange}
            type="text"
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={onChange}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={password}
            onChange={onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            name="repeatedPassword"
            value={repeatedPassword}
            onChange={onChange}
            type="password"
            placeholder="Retype Password"
          />
        </Form.Group>
        <Button variant="primary" onClick={onSubmit}>
          Register
        </Button>
      </Form>
    </Container>
  );
}
