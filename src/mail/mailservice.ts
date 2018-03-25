
var nodemailer = require('nodemailer');

export class MailService {
  public _transporter: any;
  public _mailOption: any;

  /**
   *
   */
  constructor(to: string, subject:string, body:string) {
      
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

  public SendMail(): void {
    this._transporter.sendMail(this._mailOption, function(error:any, info:any){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }


}
