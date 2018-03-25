
// const request: any = require('request');
import * as cluster from 'cluster';
import * as os from 'os';
var amqp = require('amqplib/callback_api');
import { MailService } from './mail/mailservice';

// request('http://www.google.com', function (error: Error, response: any, body: any) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });

var address = 'amqp://api.choikhomau.com';
var queuename = 'mail';

if (cluster.isMaster) {
    for (const item of os.cpus()) {
        const worker = cluster.fork();
    }
    /*cluster.on('exit', () => {
        console.log('Worker die. Fork new.')
        cluster.fork();
    })*/
} else {
     
        amqp.connect(address, function(err:any, conn:any) {
        conn.createChannel(function(err:any, ch:any) {
            var ex = queuename;
            ch.assertExchange(ex, 'fanout', {durable: false});

            ch.assertQueue('', {exclusive: true}, function(err:any, q:any) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, ex, '');

            ch.consume(q.queue, function(msg:any) {
                console.log(" [x] %s", msg.content.toString());
                
            ch.consume(q.queue, function(msg:any) {
                const content = JSON.parse(msg) as { to: string; subject: string; body: string } ;
                
                var to = content.to;
                var subject = content.subject;
                var body = content.body;
                const mail = new MailService(to, subject, body);
                mail.SendMail();

            }, {noAck: true});
            });
            });
            });
    
        });
}