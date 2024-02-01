const mongoose = require("mongoose");

function connect() {
  mongoose.connect("mongodb+srv://admin:300803@assignmentcluster.wzmdgmq.mongodb.net/quadb");

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });

  db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
  });
}

module.exports = {
  connect,
};
