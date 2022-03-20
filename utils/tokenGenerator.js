
const jwt = require("jsonwebtoken");

const tokenGenerator = (LoginUserData) => {
  console.log("_keyyy",LoginUserData._key);
    const token = jwt.sign({"emailID" : LoginUserData.emailID ,"_key" : LoginUserData._key}, process.env.SECRET_CODE)
    return token;
  }
  
module.exports = {tokenGenerator};