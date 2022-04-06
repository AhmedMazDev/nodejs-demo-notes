import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../features/notes/noteSlice";
export default function Notes() {
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <Container>
      <p>Notes : </p>
      <Row xs={1} md={2} className="g-4">
        {notes &&
          notes.map((note) => {
            return (
              <Col key={note._id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>{note.description}</Card.Text>
                    <Button
                      className="btn-danger"
                      onClick={() => onDelete(note._id)}
                    >
                      delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}
