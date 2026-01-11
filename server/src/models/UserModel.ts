import mongoose, { Schema, Model } from "mongoose";
import { IUserDocument } from "../types/index.js";

const UserSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

// Function to get user without password
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  UserSchema
);

export default User;
