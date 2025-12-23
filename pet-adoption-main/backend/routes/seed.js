const mongoose = require("mongoose");
const Pet = require("./models/Pet");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const pets = [
  { name: "Bella", type: "Dog", age: 2 },
  { name: "Luna", type: "Cat", age: 1 }
];

Pet.insertMany(pets)
  .then(() => {
    console.log("Data inserted");
    process.exit();
  });
