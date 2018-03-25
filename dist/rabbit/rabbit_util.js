"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require('amqplib/callback_api');
class rabbit_util {
    constructor(address, queuename, message) {
        this._address = '';
        this._queuename = '';
        this._message = '';
        this._address = address;
        this._queuename = queuename;
        this._message = message;
    }
    publish() {
        var queueName = this._queuename;
        var message = this._message;
        amqp.connect(this._address, function (err, conn) {
            conn.createChannel(function (err, ch) {
                var ex = queueName;
                var msg = message;
                ch.assertExchange(ex, 'fanout', { durable: false });
                ch.publish(ex, '', new Buffer(msg));
                console.log(" [x] Sent %s", msg);
            });
            setTimeout(function () { conn.close(); process.exit(0); }, 500);
        });
    }
    consume() {
        var queueName = this._queuename;
        amqp.connect(this._address, function (err, conn) {
            conn.createChannel(function (err, ch) {
                var ex = queueName;
                ch.assertExchange(ex, 'fanout', { durable: false });
                ch.assertQueue('', { exclusive: true }, function (err, q) {
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                    ch.bindQueue(q.queue, ex, '');
                    ch.consume(q.queue, function (msg) {
                        console.log(" [x] %s", msg.content.toString());
                    }, { noAck: true });
                });
            });
        });
    }
}
exports.rabbit_util = rabbit_util;
//# sourceMappingURL=rabbit_util.js.map