var amqp = require('amqplib/callback_api');

export class rabbit_util {

    public  _address: string = '';
    public _queuename: string = '';
    public _message: string = '';

    constructor(address: string, queuename: string, message:string) {
        this._address = address;
        this._queuename = queuename;
        this._message = message;
    }
   
    public publish(): void {
        var queueName = this._queuename;
        var message = this._message;

        amqp.connect(this._address, function(err:any, conn:any) {
        conn.createChannel(function(err:any, ch:any) {
            var ex = queueName;
            var msg = message;

            ch.assertExchange(ex, 'fanout', {durable: false});
            ch.publish(ex, '', new Buffer(msg));
            console.log(" [x] Sent %s", msg);
        });

        setTimeout(function() { conn.close(); process.exit(0) }, 500);
        });
    }

    public consume(): void {
        
        var queueName = this._queuename;
     
        amqp.connect(this._address, function(err:any, conn:any) {
        conn.createChannel(function(err:any, ch:any) {
            var ex = queueName;

            ch.assertExchange(ex, 'fanout', {durable: false});

            ch.assertQueue('', {exclusive: true}, function(err:any, q:any) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, ex, '');

            ch.consume(q.queue, function(msg:any) {
                console.log(" [x] %s", msg.content.toString());
            }, {noAck: true});
            });
        });
        });
    }
}




