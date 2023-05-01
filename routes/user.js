const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPasword } = require("../helpers/hash")
const RVet = require("../models/RVet");


/*router.use((req, res, next)=>{
  if (req.session.user && req.session.user.role === "admin") {
    next();
  }else{
    res.sendStatus(401)
  }
})*/


router.get("/", async (req, res) => {
  const users = await User.find()
  res.json(users)
});


router.post("/", async (req, res) => {
  const { username, password, role } = req.body;

  const check = await User.findOne({username})

  if (check) {
    res.status(400).send('Usuario ya existe')
  }else{
    let u = new User({
      username,
      password: hashPasword(password), 
      role,
    });
  
    try {
      await u.save();
      res.status(200).send("OK");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }

});


router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

router.get("/:id/rvet", (req, res) => {

  RVet.find({user : req.params.id}).then((rvet)=>{
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


router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});


router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (user) {
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});


module.exports = router;
