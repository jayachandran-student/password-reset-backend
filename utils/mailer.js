const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendMail = async (options) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };
  return transporter.sendMail(mailOptions);
};
