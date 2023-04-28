const express = require("express");
const router = express.Router();
const Paciente = require("../models/Paciente");
const Responsable = require("../models/Responsable");

/*router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});*/

router.get("/", async (req, res) => {
  const pacientes = await Paciente.find().populate("responsable");
  res.json(pacientes);
});

router.post("/", async (req, res) => {
  let paciente = new Paciente(req.body);

  if (paciente.responsable) {
    try {
      await paciente.save().then((saved) => {
        Responsable.findById(saved.responsable.toString()).then(
          (responsable) => {
            console.log(responsable);

            responsable.pacientes.push(saved);
            responsable.save();
          }
        );
      });
      res.status(200).send("OK");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  } else {
    try {
      await paciente.save();
      res.status(200).send("OK");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
});

module.exports = router;
