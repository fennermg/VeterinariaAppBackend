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
      await responsable.save().then((saved) => {
        res.status(200).send(saved);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
});

router.get("/:id", (req, res) => {
  Responsable.findById(req.params.id).populate("pacientes")
    .then((responsable) => {
      if (responsable) {
        res.json(responsable);
      } else {
        res.status(404).json({ error: "Responsable not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});


/*
router.patch("/:id", async (req, res) => {
  let responsableBeforeUpdate = await Responsable.findById(req.params.id);

  responsableBeforeUpdate.pacientes.forEach(async (paciente) => {
    let found = await Paciente.findById(paciente._id);
    found.responsable = undefined;
    found.save();
  });

  Responsable.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((responsable) => {
      if (responsable) {
        responsable.pacientes.forEach(async (paciente) => {
          let found = await Paciente.findById(paciente._id);
          found.responsable = responsable;
          found.save();
        });
        res.json(responsable);
      } else {
        res.status(404).json({ error: "Responsable not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});
*/


router.patch("/:id", async (req, res) => {
  try {
    let responsableBeforeUpdate = await Responsable.findById(req.params.id);

    for (let paciente of responsableBeforeUpdate.pacientes) {
      let found = await Paciente.findById(paciente._id).exec();
      if (found) {
        found.responsable = undefined;
        await found.save();
      } else {
        throw new Error(`Paciente with id ${paciente._id} not found`);
      }
    }

    Responsable.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(async (responsable) => {
        if (responsable) {
          for (let paciente of responsable.pacientes) {
            let found = await Paciente.findById(paciente._id).exec();
            if (found) {
              found.responsable = responsable;
              await found.save();
            } else {
              throw new Error(`Paciente with id ${paciente._id} not found`);
            }
          }
          res.json(responsable);
        } else {
          res.status(404).json({ error: "Responsable not found" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/*
router.delete("/:id", async (req, res) => {
  let responsableBeforeUpdate = await Responsable.findById(req.params.id);

  responsableBeforeUpdate.pacientes.forEach(async (paciente) => {
    let found = await Paciente.findById(paciente._id);
    found.responsable = undefined;
    found.save();
  });
  
  Responsable.findByIdAndDelete(req.params.id)
    .then((responsable) => {
      if (responsable) {
        res.json({ message: "Responsable deleted" });
      } else {
        res.status(404).json({ error: "Responsable not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});
*/

router.delete("/:id", async (req, res) => {
  try {
    let responsableBeforeUpdate = await Responsable.findById(req.params.id);

    for (let paciente of responsableBeforeUpdate.pacientes) {
      let found = await Paciente.findById(paciente._id);
      found.responsable = undefined;
      await found.save();
    }

    let deletedResponsable = await Responsable.findByIdAndDelete(req.params.id);
    if (deletedResponsable) {
      res.json({ message: "Responsable deleted" });
    } else {
      res.status(404).json({ error: "Responsable not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
