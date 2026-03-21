const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  var transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS,
    },
  });

await transporter.sendMail({
  from: '"Password Reset" <indumathimurugan745@gmail.com>',
  to,
  subject,
  text,
});

  console.log("Reset email sent to:", to);
};

module.exports = sendEmail;
