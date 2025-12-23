import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    // 🔑 IMPORTANT: numeric ID from CSV / frontend
    PetID: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    Breed: { type: String, required: true },
    PetType: { type: String, required: true }, // Dog / Cat
    AgeMonths: Number,
    Size: String,
    Color: String,
    AdoptionFee: Number,

    WeightKg: Number,
    Vaccinated: Boolean,
    HealthCondition: String,
    TimeInShelterDays: Number,

    image: String, // optional single image URL
  },
  {
    timestamps: true, // optional but useful
  }
);

export default mongoose.model("Pet", petSchema);
