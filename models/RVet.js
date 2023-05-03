const mongoose = require("mongoose");

const profAntiparaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  ultimaAplicavion: {
    type: Date,
    required: true,
  },
  periodicidad: {
    type: String,
    required: true,
  },
});

const rVetSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
  },

  numero: {
    type: Number,
    required: true,
  },

  fecha: {
    type: Date,
    required: true,
  },

  horaInicio: {
    type: String,
    required: true,
  },

  peso: {
    type: String,
    required: true,
  },

  fcValor: {
    type: String,
    required: true,
  },

  fcTipo: {
    type: String,
    required: true,
  },

  tempValor: {
    type: String,
    required: true,
  },

  tempTipo: {
    type: String,
    required: true,
  },

  tllc: {
    type: String,
    required: true,
  },

  mm: {
    type: String,
    required: true,
  },

  diagnostico: {
    type: String,
    required: true,
  },

  horaFin: {
    type: String,
    required: true,
  },
/*
    profAntipara: [profAntiparaSchema],
  */

  paciente: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
});

module.exports = mongoose.model("RVet", rVetSchema);
