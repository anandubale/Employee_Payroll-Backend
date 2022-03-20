const express = require('express');
const routes = require('./routes/routes');

const DataBase = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');


var logger = require('./config/logger');

const morgan = require('morgan');


const app = express();

DataBase;


app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan('combined', { stream: logger.logStream }));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.get('/',(req,res)=> {
    res.json("Welcome")
})

require('./routes/routes')(app);


module.exports = app.listen(3000,()=>{
    console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
})

module.exports = app;


