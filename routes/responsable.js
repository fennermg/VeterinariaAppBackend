const express = require("express");
const router = express.Router();
const Responsable = require("../models/Responsable");

router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

router.get("/", async (req, res) => {
  const responsables = await Responsable.find().populate("pacientes");
  res.json(responsables);
});

router.post("/", async (req, res) => {
  let responsable = new Responsable(req.body);

  try {
    await responsable.save();
    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


module.exports = router;