const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  raza: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  especie: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  numeroTarjeta: {
    type: String,
    required: true,
  },
  castrado: {
    type: Boolean,
    required: true,
  },
  conviveOtros: {
    type: Boolean,
    required: true,
  },
  conviveNinos: {
    type: Boolean,
    required: true,
  },
  conviveAncianos: {
    type: Boolean,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    required: true,
    default: Date.now,
  },

  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Responsable' }
});


module.exports = mongoose.model("Paciente", pacienteSchema);