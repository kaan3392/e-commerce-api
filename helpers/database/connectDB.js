import mongoose from "mongoose";

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

export default connectDatabase;
