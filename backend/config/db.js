const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("connected to MongoDB " + conn.connection.host);
  } catch (e) {
    console.log("there was an error while connecting to mongoDB");
    process.exit(1);
  }
};

module.exports = connectDB;
