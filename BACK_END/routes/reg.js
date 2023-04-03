const express= require('express');
const {check, validationResult}= require('express-validator');
const User= require('../model/User')
const gravatar= require('gravatar');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const config= require('config');
const jwtSecret = config.get('jwtSecret');
const router= express.Router();

router.post('/',[
    check('name','Name is required').not()
    .isEmpty(),
    check('email','Enter a valid email address').isEmail(),
    check('password','Please enter password with 6 or more characters').isLength({min:6})
],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,name,companyName,address,number,password}= req.body;
    try{
        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg:"User already exists"}]});
        }

//to get avatar base on email:        
        const avatar= gravatar.url(email,{
            s:"200",
            r: 'pg',
            d: 'mm'
        })
//create instance of user to register or login :
        user = new User({
            email,
            name, 
            companyName,
            address,
            number,
            password


        })
        // console.log(user.id); 
//bcrypyion of password
        const hash= await bcrypt.genSalt(10);
        user.password= await bcrypt.hash(password,hash);
//here when user register successfully it will generate token        
        const saveUser = await user.save();
        // res.send(saveUser);
        res.send('register successfully')
 //       
        const payload= {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,jwtSecret,(error,token)=>{
            if(error) throw error;
            res.json({token});
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }    
})

module.exports= router;