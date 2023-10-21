import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await User.findById(value),
      message: "User not found!",
    },
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);
export default Photo;
