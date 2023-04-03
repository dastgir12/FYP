const express= require('express');
const auth= require('../middleware/register');
const User = require('../model/User');
const router= express.Router();
const {check,validationResult}=require('express-validator');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const config= require('config');
const jwtSecret= config.get('jwtSecret');

router.get('/',auth,async(req,res)=>{
    try{
//- means not include and req.user=decode.user:
        let user= await User.findById(req.user.id).select('-password');
        // res.json(user)
        console.log(user);
        if(!user){
            return res.status(400).json({msg:'User not found'});
        }
        res.json(user);
    }
    catch(err){
        res.status(401).json({msg:"Authorization Failed"});
    }
})

router.post('/',[
    check('email','Please Enter A Valid Email Address').isEmail(),
    check('password','Password is required').exists()
],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}= req.body;
    try{
           
            let user= await User.findOne({email});
            if(!user){
                    return res.status(400).json({msg:'Invalid Credentials'});
            }
//Get id from Schema:
            const payload={
                user: {
                    id:user.id
                }
            }
            let verifycredentials= await bcrypt.compare(password,user.password);
            if(!verifycredentials){
            return res.status(400).json({msg:'Invalid Credentials'});
            }
            jwt.sign(payload,jwtSecret,(err,token)=>{
                if(err){
                    return res.status(400).json({msg:'Token Not Generated'});
                }
                res.json({token});
                // res.json(user);
            });
    }
    catch(err){
        console.error(err.message);
        res.status(400).json({msg:'Server Error'});
    }
})

module.exports= router;