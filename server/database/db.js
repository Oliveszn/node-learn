const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ekpealamicheal:Kardashian1@cluster0.l4ccjim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongo is connected");
  } catch (error) {
    console.error("Mongodb connection failed", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
