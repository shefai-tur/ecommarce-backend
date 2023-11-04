const nodemailer = require("nodemailer");

async function sendEmail(email,verify,template){

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "shefaiturrahman@gmail.com",
          pass: "ison czwa fsgs dpjl",
        },
      })


      const info = await transporter.sendMail({
        from: 'shefaiturrahman@gmail.com', // sender address 
        to: email, // list of receivers
        subject: "Please varify Your Email", // Subject line
        html: template(verify), // html body
      });

}


module.exports = sendEmail