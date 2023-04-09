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
    return res.send(req.session.user)
  }else{
    return res.sendStatus(401)
  }

});


router.get("/login",(req,res)=>{
  if (req.session.user) {
    res.send(req.session.user)
  }else{
    res.sendStatus(401)
  }
});


router.get('/logout', function(req, res){
  req.session.destroy(function(err) {
    if(err) {
      res.status(500).send('Error logging out: ' + err.message);
    } else {
      res.sendStatus(200)
    }
  });
});

module.exports = router