var amqp = require('amqplib/callback_api');
const Rabbitmq_sendMail = require('../utils/helper');


const sender = (data)  => {

        amqp.connect('amqp://localhost', function(error0, connection) {                       
        if (error0) {
            throw error0;
        }
        connection.createChannel( function(error1, channel) {                             
            if (error1) {
                throw error1;
            }

            var queue = 'Rabit_Queue';                                                       
            var msg = JSON.stringify(data);        

            channel.assertQueue(queue, {                                                       
                durable: false
            });
            console.log("[x] data has sent to receiver");

            channel.sendToQueue(queue, Buffer.from(msg));                                     

        });
       
    
    });
}


const receiver = () => {
        amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'Rabit_Queue';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {

                console.log("[x] Received %s", msg.content.toString());
                    
                const emailID = JSON.parse(msg.content); //string object
                console.log(emailID);

                
                Rabbitmq_sendMail(emailID);

            }, {
                noAck: true
            });


        });
    });

}

receiver();


module.exports = sender;


//http://localhost:15672/