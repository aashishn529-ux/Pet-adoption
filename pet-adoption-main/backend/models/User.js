import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["adopter", "admin"], default: "adopter" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }]
});

export default mongoose.model("User", userSchema);
