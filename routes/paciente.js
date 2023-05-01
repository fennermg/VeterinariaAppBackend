const express = require("express");
const router = express.Router();
const Paciente = require("../models/Paciente");
const Responsable = require("../models/Responsable");
const RVet = require("../models/RVet");
const Cita = require("../models/Cita");

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
        Responsable.findById(saved.responsable._id).then((responsable) => {
          responsable.pacientes.push(saved);
          responsable.save();
        });
        res.status(200).send(saved);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  } else {
    try {
      await paciente.save().then((saved) => {
        res.status(200).send(saved);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
});

router.get("/:id", (req, res) => {
  Paciente.findById(req.params.id).populate("responsable")
    .then((paciente) => {
      if (paciente) {
        res.json(paciente);
      } else {
        res.status(404).json({ error: "Paciente not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});



router.get("/:id/rvet", (req, res) => {

  RVet.find({paciente : req.params.id}).then((rvet)=>{
    if (rvet) {
      res.json(rvet);
    }else{
      res.status(404).json({ error: "Revision not found" });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});


router.get("/:id/cita", (req, res) => {

  Cita.find({paciente : req.params.id}).then((cita)=>{
    if (cita) {
      res.json(cita);
    }else{
      res.status(404).json({ error: "Cita not found" });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});

/*

router.patch("/:id", async (req, res) => {
  let pacienteBeforeUpdate = await Paciente.findById(req.params.id);

  Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((paciente) => {
      if (paciente) {
        if (!paciente.responsable) {
          Responsable.findOneAndUpdate(
            pacienteBeforeUpdate.responsable,
            { $pull: { pacientes: paciente._id } },
            { new: true }
          );
          res.json(paciente);
        } else if (
          paciente.responsable != pacienteBeforeUpdate.responsable
        ) {
          console.log("paso")
          Responsable.findOneAndUpdate(
            pacienteBeforeUpdate.responsable,
            { $pull: { pacientes: paciente._id } },
            { new: true }
          );

          Responsable.findByIdAndUpdate(paciente.responsable._id).then(
            (responsable) => {
              responsable.pacientes.push(paciente);
              responsable.save();
            }
          );
          res.json(paciente);
        }
      } else {
        res.status(404).json({ error: "Paciente not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

*/


router.patch("/:id", async (req, res) => {
  try {
    const pacienteBeforeUpdate = await Paciente.findById(req.params.id);
    const updatedPaciente = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedPaciente) {
      if (!updatedPaciente.responsable) {
        await Responsable.findOneAndUpdate(
          pacienteBeforeUpdate.responsable,
          { $pull: { pacientes: updatedPaciente._id } },
          { new: true }
        );
      } else if (updatedPaciente.responsable != pacienteBeforeUpdate.responsable) {
        await Responsable.findOneAndUpdate(
          pacienteBeforeUpdate.responsable,
          { $pull: { pacientes: updatedPaciente._id } },
          { new: true }
        );

        const responsable = await Responsable.findByIdAndUpdate(
          updatedPaciente.responsable._id,
          { $push: { pacientes: updatedPaciente } },
          { new: true }
        );
      }
      res.json(updatedPaciente);
    } else {
      res.status(404).json({ error: "Paciente not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  const pacienteBeforeDelete = await Paciente.findById(req.params.id);

  Paciente.findByIdAndDelete(req.params.id)
    .then(async (paciente) => {
      if (paciente) {
        const responsable = await Responsable.findOneAndUpdate(
          pacienteBeforeDelete.responsable,
          { $pull: { pacientes: req.params.id } },
          { new: true }
        );
        res.json({ message: "Paciente deleted" });
      } else {
        res.status(404).json({ error: "Paciente not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});


module.exports = router;
