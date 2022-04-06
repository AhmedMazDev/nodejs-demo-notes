import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoteForm from "../components/NoteForm";
import Notes from "../components/Notes";
import { getNotes, reset } from "../features/notes/noteSlice";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login");

    if (isError) toast.error(message);

    if (user) dispatch(getNotes());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, dispatch]);

  return (
    <Container>
      <p className="text-center fs-1">Welcome {user ? user.name : ""}</p>
      <NoteForm />
      <Notes />
    </Container>
  );
}
