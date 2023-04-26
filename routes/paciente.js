const express = require("express");
const router = express.Router();
const Paciente = require("../models/Paciente");

router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

router.get("/", async (req, res) => {
  const pacientes = await Paciente.find().populate("responsable");
  res.json(pacientes);
});

router.post("/", async (req, res) => {
  let paciente = new Paciente(req.body);

  try {
    await paciente.save();
    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;