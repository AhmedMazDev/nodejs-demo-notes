import React from "react";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";

export default function NavBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const renderLogin = () => {
    return (
      <Form className="mx-3">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Signup
        </Link>
      </Form>
    );
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>Notes App</Navbar.Brand>

        {user ? (
          <Button onClick={() => onLogout()}>Logout</Button>
        ) : (
          renderLogin()
        )}
      </Container>
    </Navbar>
  );
}
