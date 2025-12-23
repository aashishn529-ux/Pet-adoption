import express from "express";
import mongoose from "mongoose";

const router = express.Router();

/* ------------------------------
   Adoption Application Schema
-------------------------------- */
const applicationSchema = new mongoose.Schema({
  petId: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Application = mongoose.model("Application", applicationSchema);

/* ------------------------------
   SUBMIT APPLICATION
-------------------------------- */
router.post("/", async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit application" });
  }
});

/* ------------------------------
   TEST ROUTE
-------------------------------- */
router.get("/", (req, res) => {
  res.json({ message: "Application routes working" });
});

export default router;
