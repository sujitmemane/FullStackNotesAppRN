import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`, { dbName: "NOTESAPP" });
    console.log("Database is Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
