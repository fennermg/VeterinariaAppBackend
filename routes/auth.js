const { Router } = require("express");
const User = require("../models/User");

const router = Router();

router.post("/login", async (req, res) => {
  const u = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (u) {
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
  }
});

module.exports = router