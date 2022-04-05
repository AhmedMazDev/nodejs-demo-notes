const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const Joi = require("joi");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).select("-user");
  res.status(200).json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const note = req.body;
  const result = validateNote(note);

  if (result.error) {
    res.status(400);
    throw new Error("please provide a valid title and description");
  }

  note.user = req.user.id;

  const creatdNote = await Note.create(note);

  res.status(201).json(creatdNote);
});

const updateNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);

  if (!note) {
    res.status(400);
    throw new Error("note not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  if (req.user.id !== note.user.toString()) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedNote = await Note.findOneAndUpdate(id, req.body, {
    new: true,
  });

  res.status(201).json(updatedNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error("please provide a valid id");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  const note = await Note.findById(id);

  if (req.user.id !== note.user.toString()) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await note.remove();
  res.status(200).json(note);
});

function validateNote(note) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(5).max(30).required(),
  });

  return schema.validate(note);
}

module.exports = {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};
