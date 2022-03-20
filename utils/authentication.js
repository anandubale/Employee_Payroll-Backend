const jwt = require('jsonwebtoken');

// import jwt from 'jsonwebtoken';

exports.Auth = async (req, res,next) => {
    try {

      let bearerToken = req.header('Authorization')
      if (!bearerToken)
        throw {
          code: 400,
          message: 'Authorization token is required'  
  
        };
      bearerToken = bearerToken.split(' ')[1]

      jwt.verify(bearerToken, process.env.SECRET_CODE ,(err,verifedtoken)=>{
        if (err)
        throw {
          code: 401,
          message: 'User dont have access to this UsedID '
        };
        else{

          console.log("this is verification token " ,verifedtoken)

          req.body.UserID = verifedtoken._key;

          console.log("UserID got from token" ,req.body.UserID);
        }
        next();
      });
    } catch (error) {
      return res.status(400).send({
      success : false,
      message : "Error Occured while Authentication",
      error : error.message
    })

  }
}


