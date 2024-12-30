import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bonStay");
    console.log("Connected to MongoDB");

  } catch (error) {
    console.error("Error connecting to MongoDB or seeding database:", error);
  }
};

export default db;