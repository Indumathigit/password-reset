const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  var transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.BREVO_USER,
    to,
    subject,
    text,
  });

  console.log("Reset email sent to:", to);
};

module.exports = sendEmail;