const nodemailer = require("nodemailer");
const asyncHandle = require("express-async-handler");
const sendMail = asyncHandle(async ({ email, html, subject }) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Của hàng điện tử 👻" <no-reply@cuahangdientu.com>',
    to: email,
    subject: subject, // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  });
  return info;
});

module.exports = sendMail;
