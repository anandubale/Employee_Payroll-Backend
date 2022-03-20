const joi = require('joi');

exports.empValidator = (req, res, next) => {
  const schema = joi.object({
    firstName: joi.string().min(4).required(),
    lastName: joi.string().min(4).required(),
    emailID: joi.string().min(4).required(),
    city : joi.string().min(4).required(),
    salary : joi.number().min(4).required(),
    mobile : joi.number().min(4).required(),
    company : joi.string().min(4).required(),
    designation: joi.string().min(4).required()
  });

  const { error, value } = schema.validate(req.body); //validate value using Schema and Options                                                
  if (error) 
  {  
    res.status(400).json({
      message : error 
    });
  } 
  else { 
    req.validatedBody = value;                 //true or false
    next();
  }
};
