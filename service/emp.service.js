const { empCollection } = require('../config/database')
var util = require('util')
const arangojs = require('arangojs');

const CircularJSON = require('circular-json');


const SavedEmpDetails = async (empDetais) => {
    const savedEmp = await empCollection.save(empDetais);
    return savedEmp;
}


const getallEmpDetails = async () => {

    // const AllEmpData = await empCollection.byExample({UserID  : body.UserID});

    const AllEmpData = await empCollection.all();

    // console.log(util.inspect(AllEmpData._batches._itemsCursor))

    // const obj_str = util.inspect(AllEmpData) 
    // console.log(obj_str)

    const json = CircularJSON.stringify(AllEmpData._batches);  //using circularJson pakage
    console.log(json);

    return AllEmpData;
}


const EmployeeByID = async (_key,body) => {
    console.log("this is UserID  of service:- ",body.UserID);
    const EmployeeData = await empCollection.firstExample({_key : _key , UserID : body.UserID });
    return EmployeeData;

}

const updateEmployeeDetails = async(_key,body,empDetails) => { 
    
    
    const filter1 = await empCollection.firstExample({UserID : body.UserID} )
    console.log("filter1" ,filter1);

    const UpdatedEmpDetails = await empCollection.update({_key : _key , UserID : body.UserID}, {empDetails})
    console.log("Key" ,UpdatedEmpDetails._key);

    const filter2 = await empCollection.firstExample({_key : UpdatedEmpDetails._key} )
    console.log("filter2" , filter2)
    
    if(filter1.UserID == filter2.UserID){
        return UpdatedEmpDetails;

    }
    else{
        throw new Error("This User Dont have Access to Employee Details")
    }



}


const removeEmpData = async (_key,UserID) => {    

    const checkingData = await empCollection.firstExample({_key : _key})
    console.log(checkingData)
    return await empCollection.removeByExample({_key : _key, UserID : UserID})
}


module.exports = {

    SavedEmpDetails,
    getallEmpDetails,
    EmployeeByID,
    updateEmployeeDetails,
    removeEmpData
};

















