import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNote } from "../features/notes/noteSlice";

export default function NoteForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const { title, description } = form;

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote(form));
    setForm({
      title: "",
      description: "",
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Note Title : </Form.Label>
        <Form.Control
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setForm({ title: e.target.value, description })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Note Description :</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setForm({ title, description: e.target.value })}
        />
      </Form.Group>
      <Button type="submit">Add Note</Button>
    </Form>
  );
}
