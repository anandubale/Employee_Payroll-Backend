const { createLogger, transport , format, transports} = require('winston');
const winston = require('winston');


exports.logger = createLogger({
  transports: [
    new transports.File({
      filename : 'info.log',
      level : 'info',
      format : format.combine(format.timestamp(),format.json())
    }),
    new transports.File({
      filename :  'error.log',
      level : 'error',
      format : format.combine(format.timestamp(),format.json())
    })
  ]
})

// //printing into console:-



// const myFormat = format.printf(({ level, message, timestamp }) => {
//   return `${timestamp} ${level}: ${message}`;
// });

// const logger = createLogger({
     
//   // format : format.combine(format.timestamp(),format.json()),
//   format : format.combine(
//     format.colorize(),
//     format.timestamp({ format : 'YYYY-MM-DD HH:mm:ss'}),
//     myFormat),

//   transports: [
//     new winston.transports.Console()
//   ],
// })

// module.exports = logger;