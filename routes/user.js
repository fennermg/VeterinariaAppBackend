const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPasword } = require("../helpers/hash")


router.use((req, res, next)=>{
  if (req.session.user && req.session.user.role === "admin") {
    next();
  }else{
    res.sendStatus(401)
  }
})


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

module.exports = router;
