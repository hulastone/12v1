"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
// const request: any = require('request');
const cluster = __importStar(require("cluster"));
const os = __importStar(require("os"));
var amqp = require('amqplib/callback_api');
const mailservice_1 = require("./mail/mailservice");
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
}
else {
    amqp.connect(address, function (err, conn) {
        conn.createChannel(function (err, ch) {
            var ex = queuename;
            ch.assertExchange(ex, 'fanout', { durable: false });
            ch.assertQueue('', { exclusive: true }, function (err, q) {
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                ch.bindQueue(q.queue, ex, '');
                ch.consume(q.queue, function (msg) {
                    console.log(" [x] %s", msg.content.toString());
                    ch.consume(q.queue, function (msg) {
                        const content = JSON.parse(msg);
                        var to = content.to;
                        var subject = content.subject;
                        var body = content.body;
                        const mail = new mailservice_1.MailService(to, subject, body);
                        mail.SendMail();
                    }, { noAck: true });
                });
            });
        });
    });
}
//# sourceMappingURL=index.js.map