const express = require("express");
const router = express.Router();
const Cita = require("../models/Cita")


router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

router.get("/", async (req, res) => {
  const citas = await Cita.find().populate("paciente rvet");
  res.json(citas);
});

router.post("/", async (req, res) => {
  try {
    const cita = new Cita(req.body);
    await cita.save();
    res.status(200).json(cita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", (req, res) => {
  Cita.findById(req.params.id)
    .then((cita) => {
      if (cita) {
        res.json(cita);
      } else {
        res.status(404).json({ error: "Cita not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.patch("/:id", (req, res) => {

  Cita.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((cita) => {
      if (cita) {
        res.json(cita);
      } else {
        res.status(404).json({ error: "Cita not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});


router.delete("/:id", (req, res) => {
  Cita.findByIdAndDelete(req.params.id)
    .then((cita) => {
      if (cita) {
        res.json({ message: "Cita deleted" });
      } else {
        res.status(404).json({ error: "Cita not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

module.exports = router;
