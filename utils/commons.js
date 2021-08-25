const nodemailer = require("nodemailer");

function sendMailFromAdmin(mailOptions) {
  // console.log("mailOptions", mailOptions)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'kietnodejs1997@gmail.com',
        pass: 'redagon291'
      }
    });
    return transporter.sendMail(mailOptions)
      .then((data) => Promise.resolve({ message: "Sent Email Restore Successfully: ",data}) )
      .catch((err) => Promise.reject({ message: `Error: ${err} `}))
}

module.exports = {
  sendMailFromAdmin,
  };
