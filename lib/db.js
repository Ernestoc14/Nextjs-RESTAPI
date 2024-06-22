import mongoose from "mongoose";

// Get URI from the dot env
const MONGO_URI = process.env.MONGODB_URI;

// Connect to the database
const connectDB = async () => {
  // Check the current state of the connection
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected to the database");
    return;
  } else if (connectionState === 2) {
    console.log("Connecting to the database");
    return;
  }

  try {
    mongoose.connect(MONGO_URI, {
      dbName: "Nextjs-RestAPI",
      bufferCommands: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

export default connectDB;
