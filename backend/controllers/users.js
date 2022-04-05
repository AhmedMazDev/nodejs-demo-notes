const Joi = require("joi");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const newUser = req.body;
  const result = validateUser(newUser);

  if (result.error)
    return res
      .status(401)
      .json({ message: "make sure to fill all the fields" });

  const userExists = await User.findOne({ email: newUser.email });
  if (userExists) return res.status(401).send("email already exists");

  const salt = await bcrypt.genSalt(10);
  const password = newUser.password.toString();
  const hashedPass = await bcrypt.hash(password, salt);
  newUser.password = hashedPass;

  const user = await User.create(newUser);

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const userCred = req.body;
  if (!userCred.email || !userCred.password) {
    res.status(401);
    throw new Error("please fill all the fields");
  }

  const user = await User.findOne({ email: userCred.email });
  if (user && (await bcrypt.compare(userCred.password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: user.generateAuthToken(),
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(30).required(),
    repeatPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });

  return schema.validate(user);
}

module.exports = {
  registerUser,
  loginUser,
};
