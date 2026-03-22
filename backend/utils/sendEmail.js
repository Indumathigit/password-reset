const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (to, subject, text) => {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = { email: "indumathimurugan745@gmail.com", name: "Password Reset" };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.textContent = text;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
  console.log("Reset email sent to:", to);
};

module.exports = sendEmail;
