const req = require('express/lib/request');
const userService = require('../service/user.service');



/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
*/


exports.register = async (req,res)=> {

    try {
        // var userDetails = {
        //     firstName : req.body.firstName,
        //     lastName : req.body.lastName,
        //     emailID : req.body.emailID,
        //     password : req.body.password 
        // }   

        const regUserData = await userService.UserRegister(req.body);
        res.status(201).send({
            success : true,
            data : regUserData,
            message : "User registered Succesfully"
        })
    } catch (error) {
        return res.status(409).send({
            success : false,
            message : "Error ocuured while creating",
            error : error.message
        })
    }

} 




/**
 * Controller to login throught exsiting User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
*/



exports.UserLogin = async (req,res) =>  {
    try {
        // var userDetails = {
        //     emailID : req.body.emailID,
        //     password : req.body.password 
        // }   
     
        const LoginUserData = await userService.LoginUser(req.body);
        res.status(200).send({
            success : true,
            data : LoginUserData,   
            message : "User login Succesfully"
        })
        
    } catch (error) {
        return res.status(500).send({
            success : false,
            message : "Error ocuured while login",
            error : error.message
        })
    }
}
