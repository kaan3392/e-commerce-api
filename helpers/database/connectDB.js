const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", true);

  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );
};

module.exports = connectDatabase;
