const express = require("express");
const router = express.Router();

//custom middleware used for checking the login status of the user
var forlogin=require('../middleware/forlogin')

//for hashing the password
const bcrypt = require("bcryptjs");

//for generating token for user
const jwt = require('jsonwebtoken');
const secretKey='ketan@1'


//for validation part
const { body, validationResult } = require("express-validator");

//to import user module
const User = require("../models/User");

//initialization of routers

// ROUTE:1 ==> to create a new user<< api/auth/createuser/ >>:No login required
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if the validation error occured we will show this result
    let sucess=false
    if (!errors.isEmpty()) {
      sucess=false
      return res.status(400).json({ sucess,errors: errors.array() });
    }
    try {
      
      //we have created this to check whether the user email already exists or not
      let emailFinder = await User.findOne({ email: req.body.email });
      if (emailFinder) {
        sucess=false
        return res
          .status(500)
          .json({ sucess,error: "User with this emial already exists" });
      }

      // if no error comes we will create the new user

      // this is for hashing the password.
      let salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      let user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      //this statement is to print the details of new user on the window
      const data={
        user:{
            id:user.id
        }
      }
      // generate a auth token 
      sucess=true
      let authToken = jwt.sign(data, secretKey);
      res.json({sucess,authToken});
    } 
    catch (error) {
      sucess=false
      res.send("some error occured " + error);
      res.json({sucess});
    }
  }
)

// ROUTE:2 ==> to authenticate a user<< api/auth/login/ >>:No login required
router.post('/login',[
    body("email").isEmail(),
    body("password").exists()
  ],async (req,res)=>{
    const errors = validationResult(req);
    //if the validation error occured we will show this result
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email=req.body.email
    const password=req.body.password
    let sucess=false
    try{
        //checking for valid email
        let user=await User.findOne({email:email})
        if (!user){
            sucess=false
            return res.status(500).json({sucess,error:'Email not Found'})
        }
        //checking for valid password
        const userPassword=await bcrypt.compare(password,user.password)
        if(!userPassword){
          sucess=false
            return res.status(500).json({sucess,error:'password is wrong'}) 
        }
        const data={
            user:{
                id:user.id
            }
          }
          const authToken = jwt.sign(data, secretKey);
          sucess=true
          res.json({sucess,authToken});

    }
    catch (error) {
        res.send("some error occured " + error);
      }
})

// ROUTE:3 ==> to get details of logged in user<< api/auth/getuser/ >>:login required
router.post('/getuser',forlogin,async(req,res)=>{
let userId=req.user.id
try{
let userDetails=await User.findById(userId).select('-password')
res.json(userDetails)
}
catch (error) {
    res.send("some error occured " + error);
  }
})

module.exports = router;
