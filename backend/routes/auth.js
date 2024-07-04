//imports
const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');        //provide validation
const User = require('../models/User')
const bcrypt = require('bcryptjs');     //designed to be safe for storing passwords in a database
var jwt = require('jsonwebtoken');      //provide token for securely send data between client and server
const fetchUser = require('../middleware/fetchUser');

//create secret string
const JWT_SECRET = "niceone";

//ROUTE :1 create a user using : POST "api/auth/createuser"  --> no login required
router.post('/createuser', 
[
   //body takes two argument -> first for value --> second for display error msg 
  body('name', 'please enter valid name').isLength({ min: 5 }),
  body('email', 'please enter valid email').isEmail(),
  body('password', 'password should be atleast 8 characters').isLength({ min: 8 }),
], 
async (request, response) =>
{
    //if there are errors return bad request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exits already
    //findOne  --  used to retrieve a single document from a collection that matches the specified query criteria.
    try
    {

        let user =await User.findOne({email: request.body.email})
        if(user)        //if user alreay login with this email
        {
            return response.status(400).json({error: "sorry a user with this email alreay exits"})
        }

        //generate salt    --   protect against brute-force and rainbow table attacks
        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(request.body.password, salt)      //added hash code in password

        //create a new user
        user = await User.create
        ({
          name: request.body.name,
          email: request.body.email,
          password: securedPass,
        })
        
        

        //create object
        const data =
        {
            user:
            {
                id: user.id
            }
        }

        //generate jwt(json web token) token    --  way to securely send data between client and server
        const authToken = jwt.sign(data, JWT_SECRET);

        response.json({authToken})     //send response

    }
    //catch unexpected error and display into console and send internal error to user
    catch(error)
    {
        console.error(error.message);
        response.status(500).send("internal server error.....");
    }
   
})

//ROUTE : 2 authenticate a user using : POST "api/auth/login"  -->  no login required
router.post('/login',
[
    body('email', 'please enter valid email').isEmail(),
    body('password', 'password can not be blank').exists()
], 
async (request, response) =>
{
    //if there are errors return bad request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    //destructure
    const {email, password} = request.body;
    try 
    {
        let user = await User.findOne({email})
        if(!user)       //if user not exits
        {
            return response.status(400).json({error: "please try to login with correct credentials"})
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword)        //if password is not match
        {
            return response.status(400).json({error: "please try to login with correct credentials"})
        }

        //if password is correct 
        // object
        const data =
        {
            user:
            {
                id: user.id
            }
        }

        //generate jwt token
        const authToken = jwt.sign(data, JWT_SECRET);

        response.json({authToken})     //send response

        
    } 
    //catch unexpected error and display into console and send internal error to user
    catch(error)
    {
        console.error(error.message);
        response.status(500).send("internal server error.....");
    }
    
})

//ROUTE : 3 get loggdin user details : POST "api/auth/getuser"  --> login required
router.post('/getuser', fetchUser, async (request, response) =>
{
    try 
    {
            userId = request.user.id;    
            const user = await User.findById(userId).select("-password")    //select all fields without password
            response.send(user)
    } 
    //catch unexpected error and display into console and send internal error to user
    catch(error)
    {
        console.error(error.message);
        response.status(500).send("internal server error.....");
    }
})



module.exports = router