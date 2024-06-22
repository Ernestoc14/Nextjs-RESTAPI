import { Schema, model, models } from "mongoose";

// Create a new schema for the user
const UserSchema = new Schema({
  // Define the fields in the user model
  email: { type: "string", required: true, unique: true },
  username: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
},
{
  // Add timestamps to the schema
  timestamps: true,
});

// Create a new model if it doesn't exist
const User = models.User || model("User", UserSchema);

export default User;