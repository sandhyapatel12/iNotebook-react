//import jwt token for get auth-token
var jwt = require('jsonwebtoken');

//create secret string
const JWT_SECRET = "niceone";

const fetchUser = (request, response , next) =>
{
    //get the user from awt token and add id to request object
    const token = request.header("auth-token")      //"auth-token" header give into -> thunder client -> "get user data" request -> headers  -> and give value which define in auth-token 
    if(!token)  //if token is not exist
    {
        return  response.status(401).send({error: "please authenticate using a valid token"})
    }

    try
    {
         //verify the token and secret string
        const data =  jwt.verify(token, JWT_SECRET)
        request.user = data.user
        next()      //using this run next function

    }
    catch(error)
    {
        return  response.status(401).send({error: "please authenticate using a valid token"})

    }
   
 

}

module.exports = fetchUser;
