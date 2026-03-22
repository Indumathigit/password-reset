const Brevo = require("@getbrevo/brevo");

const sendEmail = async (to, subject, text) => {
  var apiInstance = new Brevo.TransactionalEmailsApi();

  var apiKey = apiInstance.authentications["apiKey"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  var sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = { email: "indumathimurugan745@gmail.com", name: "Password Reset" };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.textContent = text;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
  console.log("Reset email sent to:", to);
};

module.exports = sendEmail;