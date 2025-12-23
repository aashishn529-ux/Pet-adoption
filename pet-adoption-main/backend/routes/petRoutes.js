import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

/* ------------------------------
   GET ALL PETS
-------------------------------- */
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pets" });
  }
});

/* ------------------------------
   GET PET BY ID
-------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pet" });
  }
});

export default router;
