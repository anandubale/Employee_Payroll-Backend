const joi = require('joi');

exports.newUserValidator = (req, res, next) => {
  const schema = joi.object({
    firstName: joi.string().min(4).required(),
    lastName: joi.string().min(4).required(),
    emailID: joi.string().min(5).required(),
    password: joi.string().min(10).required(),

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
