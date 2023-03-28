const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async(req, res) => {
    const u = await User.findOne({user:req.body.user,password:req.body.password})
    if (u) {
        res.send('Encontrado')
    }else{
        res.send('Invalido')
    }
});

router.post("/", async (req, res) => {
  const { user, password, role } = req.body;

  console.log(req.body);

  let u = new User({
    user,
    password,
    role,
  });

  await u.save();

  res.send("creado");
});

module.exports = router;
