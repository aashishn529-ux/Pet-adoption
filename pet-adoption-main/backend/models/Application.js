import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  experience: String,
  homeType: String,
  status: { type: String, default: "Pending" }
});

export default mongoose.model("Application", applicationSchema);
