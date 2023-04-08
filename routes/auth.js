const { Router } = require("express");
const User = require("../models/User");
const {comparePassword} = require("../helpers/hash")

const router = Router();

router.post("/login", async (req, res) => {

  const {username, password} = req.body

  if (!username || !password) {
    return res.sendStatus(400)
  }
  
  const user = await User.findOne({username});

  if (!user) {
    return res.sendStatus(401)
  }

  const isValid = comparePassword(password, user.password)

  if (isValid) {
    req.session.user = user
    return res.sendStatus(200)
  }else{
    return res.sendStatus(401)
  }

 /* if (u) {
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      req.session.user = {
        username: u.username,
        role: u.role
      };
      res.send(req.session)
    }
  } else {
    res.sendStatus(401);
  }*/

});

module.exports = router