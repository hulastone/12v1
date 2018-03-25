"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
class MailService {
    /**
     *
     */
    constructor(to, subject, body) {
        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nguyenducthanh2151@gmail.com',
                pass: 'thinhhanh'
            }
        });
        this._mailOption = {
            from: 'nguyenducthanh2151@gmail.com',
            to: to,
            subject: subject,
            text: body
        };
    }
    SendMail() {
        this._transporter.sendMail(this._mailOption, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
exports.MailService = MailService;
//# sourceMappingURL=mailservice.js.map