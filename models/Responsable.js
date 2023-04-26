const mongoose = require("mongoose");

const responsableSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
/*  apellido: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
*/
  pacientes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' }]

});


module.exports = mongoose.model("Responsable", responsableSchema);