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
        Responsable.findById(saved.responsable._id).then(
          (responsable) => {
            responsable.pacientes.push(saved);
            responsable.save();
          }
        );
        res.status(200).send(saved);
      });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  } else {
    try {
      await paciente.save().then((saved)=>{
        res.status(200).send(saved);
      });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
});



router.get('/:id', (req, res) => {
  Paciente.findById(req.params.id)
    .then(paciente => {
      if (paciente) {
        res.json(paciente);
      } else {
        res.status(404).json({ error: 'Paciente not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});


router.patch('/:id', async (req, res) => {
  let pacienteBeforeUpdate = await Paciente.findById(req.params.id);

  Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(paciente => {
      if (paciente) {
          if (!paciente.responsable) {


            Responsable.updateOne(
              { _id: pacienteBeforeUpdate.responsable }, 
              { $pull: { pacientes: paciente._id } }
            );

            
            /*Responsable.findById(pacienteBeforeUpdate.responsable).then((found)=>{
              console.log(found)
              
            })*/
          }
        res.json(paciente);
      } else {
        res.status(404).json({ error: 'Paciente not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});


router.delete('/:id', (req, res) => {
  Paciente.findByIdAndDelete(req.params.id)
    .then(paciente => {
      if (paciente) {
        res.json({ message: 'Paciente deleted' });
      } else {
        res.status(404).json({ error: 'Paciente not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});



module.exports = router;
