const mongoose = require("mongoose");

const predioSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: [true, "Ingresa el código"],
      trim: true,
    },
    nombre: {
      type: String,
      required: [true, "Ingresa tu nombre!"],
    },
    cedula: {
      type: String,
      required: [true, "Ingresa tu cedula"],
      trim: true,
      unique: true,
    },
    area: {
      type: String,
      required: [true, "Ingresa tu area"],
    },

    direccion: {
      type: String,
      required: [true, "ingresa tu direccion"],
    },
    barrio: {
      type: String,
      required: [true, "Ingresa tu barrio"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Predios", predioSchema);
