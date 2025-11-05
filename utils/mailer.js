// utils/mailer.js
const nodemailer = require("nodemailer");

let transporter;

try {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // Mailtrap: false; set true only if you use port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} catch (e) {
  console.error("MAILER CONFIG ERROR:", e?.message || e);
}

exports.sendMail = async (options) => {
  if (!transporter) {
    throw new Error("Email transporter not initialized");
  }
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("MAIL SENT:", info.messageId);
    return info;
  } catch (err) {
    console.error("MAIL SEND ERROR:", err?.message || err);
    throw err;
  }
};
