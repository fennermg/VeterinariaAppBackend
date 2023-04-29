const express = require("express");
const router = express.Router();
const Responsable = require("../models/Responsable");
const Paciente = require("../models/Paciente");

/*router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});*/

router.get("/", async (req, res) => {
  const responsables = await Responsable.find().populate("pacientes");
  res.json(responsables);
});

router.post("/", async (req, res) => {
  let responsable = new Responsable(req.body);

  if (responsable.pacientes.length != 0) {
    try {
      await responsable.save().then((saved) => {
        saved.pacientes.forEach((paciente) => {
          Paciente.findById(paciente._id).then((pacienteFound) => {
            pacienteFound.responsable = saved;
            pacienteFound.save();
          });
        });
        res.status(200).send(saved);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  } else {
    try {
      await responsable.save().then((saved)=>{
        res.status(200).send(saved);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
});

module.exports = router;
