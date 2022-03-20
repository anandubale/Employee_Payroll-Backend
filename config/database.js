var dbconfig = require('../config/db')
const arangojs  = require('arangojs')

    DataBase = new arangojs.Database({                                          //database connection
        url : dbconfig.url
    });



DataBase.useDatabase(dbconfig.database); //database selection

DataBase.useBasicAuth(dbconfig.username, dbconfig.password);  //specifying user 

const UserCollection = DataBase.collection('userCollection');
const empCollection = DataBase.collection('empCollection');  




module.exports = {UserCollection,empCollection}