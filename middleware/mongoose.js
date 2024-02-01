const mongoose = require("mongoose");

function connect() {
  mongoose.connect("your-mongodb-connection-string/quadb");

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
