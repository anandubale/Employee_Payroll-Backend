const bcrypt = require('bcrypt');
var  { UserCollection } = require('../config/database')
var { tokenGenerator } = require('../utils/tokenGenerator');
const sender = require('../utils/rabitMQ');




exports.UserRegister = async (body) => {

    const checkExisting = await UserCollection.byExample({emailID : body.emailID});

    if(checkExisting._batches._count == 0)  
    {
        const hashedPass = bcrypt.hashSync(body.password,10);
        body.password = hashedPass;
        const SavedUser = await UserCollection.save(body);

        sender(body.emailID);  //sending emailID to rabitmq

        return SavedUser;
    }
    else{
        throw new Error("User already registered");
    }
}   


  
exports.LoginUser = async (body)=> {


    const LoginUserData = await UserCollection.firstExample({emailID : body.emailID});
    const validate = bcrypt.compareSync(body.password, LoginUserData.password);
    if(validate){
        const token = tokenGenerator(LoginUserData);
        return token;
    }
    else{
        throw new Error("Wrong Password")
    }
}


