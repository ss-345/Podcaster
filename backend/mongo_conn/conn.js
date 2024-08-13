const mongoose = require("mongoose");

const conn = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    await mongoose.connect(mongoUri);
    console.log("Database connected.");
  } catch (error) {
    console.log("Error during mongoose connection:", error);
  }
};

conn();
