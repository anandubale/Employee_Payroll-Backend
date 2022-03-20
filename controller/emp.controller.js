var empService = require('../service/emp.service');

/**
 * Controller to save Employee Details
 
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
*/



exports.SaveEmpDetails = async (req,res) => {

    try {   
        var userDetails = {
            UserID : req.body.UserID,
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            emailID: req.body.emailID,
            city : req.body.city,
            salary : req.body.salary,
            mobile : req.body.mobile,
            company : req.body.company,
            designation: req.body.designation
        }
        const savedEmp = await empService.SavedEmpDetails(userDetails);
        res.status(201).send({
            code : 201,
            data : savedEmp,
            message : " Employee details saved properly"
        })
        
    } catch (error) {
        return res.status(400).send({
            success : false,
            message : "Error Occured while saving details",
            error : error.message
        })
        
    }
}


/**
 * Controller to Get all saved Employee Details
 
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
*/


exports.getallEmpDetails = async (req,res) => {
    try {
        console.log(req.body.UserID);
        const AllEmpData = await empService.getallEmpDetails();
        res.status(200).send({
            code : 200,
            data : AllEmpData,
            message : "Fetched all Employee details Successfully"
        })        
    } catch (error) {
        res.status(404).send({
            success : false,
            code : 404,
            message : error.message
        })
        
    }
} 



/**
 * Controller to Get Employee using ID
 
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
*/


exports.EmpDetailsByID = async (req,res) => {
    try {
        console.log("thi is UserID of Controller",req.body.UserID);
        const EmpData = await empService.EmployeeByID(req.params._key,req.body);
        res.status(200).send({
            code : 200,
            data : EmpData,
            message : "Fetched all Employee details Successfully"
        })        
    } catch (error) {
        res.status(404).send({
            success : false,
            code : 404,
            message : error.message
        })
        
    }
} 



/**
 * Controller to Update Employee using ID
 * 
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
*/


exports.updateEmployeeDetails = async (req,res) =>{
    try {
        var userDetails = {
            UserID : req.body.UserID,
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            emailID: req.body.emailID,
            city : req.body.city,
            salary : req.body.salary,
            mobile : req.body.mobile,
            company : req.body.company,
            designation: req.body.designation
        }  
        const UpdatedDetails = await empService.updateEmployeeDetails(req.params._key,req.body, userDetails)
        res.status(200).send({
            success :true,
            data :UpdatedDetails,
            message : "Employee details updated Successfully"
        })
        } catch (error) {
        res.status(400).send({
            success : false,
            code : 400,
            message : error.message
        })
    }
}

/**
 * Controller to Remove Employee using ID

 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
*/



exports.removeEmpData = async (req,res)=>{  
    try {       
        await empService.removeEmpData(req.params._key, req.body.UserID);
        res.status(200).send({
            success : true,
            message : `User with ${req.params._key} is Removed Successfully` 
        })
    } catch (error) {
        res.status(400).send({
            success : false,
            code : 400,
            message : error.message  
        })
    }
}

