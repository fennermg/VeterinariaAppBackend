const express = require("express");
const router = express.Router();
const RVet = require("../models/RVet");
const Cita = require("../models/Cita");

router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

router.get("/", async (req, res) => {
  const rvets = await RVet.find().populate("paciente user");
  res.json(rvets);
});

router.post("/", async (req, res) => {
  try {
    const rvet = new RVet(req.body);
    await rvet.save();
    res.status(201).json(rvet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", (req, res) => {
  RVet.findById(req.params.id)
    .then((rvet) => {
      if (rvet) {
        res.json(rvet);
      } else {
        res.status(404).json({ error: "Revision not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.get("/:id/cita", (req, res) => {
  Cita.find({ rvet: req.params.id })
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
  RVet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((rvet) => {
      if (rvet) {
        res.json(rvet);
      } else {
        res.status(404).json({ error: "Revision not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  RVet.findByIdAndDelete(req.params.id)
    .then((rvet) => {
      if (rvet) {
        res.json({ message: "Revision deleted" });
      } else {
        res.status(404).json({ error: "Revision not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

module.exports = router;
