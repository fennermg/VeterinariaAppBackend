const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema({
  motivo: {
    type: String,
    required: true,
  },

  fecha: {
    type: Date,
    required: true,
  },

  hora: {
    type: String,
    required: true,
  },

  estado: {
    type: String,
    required: true,
  },

  tiempoEst: {
    type: String,
    required: true,
  },

  paciente: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },

  rvet: { type: mongoose.Schema.Types.ObjectId, ref: "RVet" },
  
});

module.exports = mongoose.model("Cita", citaSchema);
