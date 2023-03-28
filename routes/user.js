const express = require("express");
const { collection } = require("../models/User");
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

router.post("/", async(req,res)=>{
  const{user, password}=req.body
  try{
    const u = await collection.findOne({user:req.body.user,password:req.body.password})
    if(u){
      res.json("Encontrado")
    }else{
      res.json("Invalido")
    }
  }
  catch(e){
    res.json("Invalido")
  }
})

router.post("/signup", async (req, res) => {
  const { user, password, role } = req.body;

  const e = await User.findOne({user});
  if(!user){
    return res.json({error: "Usuario no existe"});
  }

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
