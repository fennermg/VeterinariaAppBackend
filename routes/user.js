const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const u = await User.findOne({
    user: req.body.user,
    password: req.body.password,
  });
  console.log(req.body);
  if (u) {
    res.send("Encontrado");
  } else {
    res.send("Invalido");
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const check = await User.findOne({
    username: req.body.user,
    password: req.body.password,
  });
  if (check) {
    res.json("Encontrado");
  } else {
    res.json("Error");
  }
});

router.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  console.log(req.body);

  const check = await User.findOne({username})

  if (check) {
    res.status(400).send('Usuario ya existe')
  }else{
    let u = new User({
      username,
      password,
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

module.exports = router;
