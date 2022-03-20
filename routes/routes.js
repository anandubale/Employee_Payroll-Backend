const userController  = require('../controller/user.controller');
const EmpController  = require('../controller/emp.controller');
const newUserValidator = require('../validators/user.validator');
const  empValidator  = require('../validators/emp.validator');
const authentication = require('../utils/authentication')

module.exports= (app)=> 
{       
    //USER-API'S    


    //registration
    app.post('/register',newUserValidator.newUserValidator,userController.register);

    //login
    app.post('/login',userController.UserLogin);


    

    //EMPLOYEE-API'S    


    //save employee details
    app.post('/emp/save', empValidator.empValidator, authentication.Auth, EmpController.SaveEmpDetails); //OK

    //get all Employee Details
    app.get('/emp/getall',authentication.Auth, EmpController.getallEmpDetails);  //need To work

    //get employee by ID:
    app.get('/emp/:_key',authentication.Auth, EmpController.EmpDetailsByID);  //auth OK
 
    //Update Employee by  _key
    app.put('/emp/:_key',authentication.Auth, EmpController.updateEmployeeDetails);   //auth OK

    //Remove Employee details from Database using _key
    app.delete('/emp/:_key',authentication.Auth, EmpController.removeEmpData);  //deleting others data

}





