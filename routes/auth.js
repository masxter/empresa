//authenticação
const express = require('express');
// adicionando as rotas do express

const router = require('express').Router();

//model User
const User = require('../models/User');
//para incriptar a senha 
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_TOKEN;

// registro do usuario
router.post("/registro", async(req,res)=>{
    

        const {username,email,password} = req.body;
        const user = new User({username,email,password});

        try {
            await user.save();
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error:"error ao registrar o usuario"})
        }

});

//login

router.post("/login", async(req,res)=>{
   const {email,password} = req.body;

   try {
       let user = await User.findOne({email});
       if(!user){
        res.status(401).json({error:"Email ou senha incorretos"});
       }
       else{
           user.isCorretoPass(password, function(error,same){
               if(!same)
               res.status(401).json({error:"Email ou senha incorretos"});
               else{
                   const token = jwt.sign({email}, secret,{expiresIn: '1d'});
                   res.json({user:user, token:token});
               }
           })
       }
   } catch (error) {
       res.status(500).json({error:"error no servidor tente novamente"})
   }
});

module.exports = router;