const path = require("path");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const users = require("./routes/users");
const notes = require("./routes/notes");
const { errorHandler } = require("./middleware/error");

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/users", users);
app.use("/api/notes", notes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log("listening on port " + port));
