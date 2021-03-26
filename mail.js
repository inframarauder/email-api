const nodemailer = require("nodemailer");

//nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = async ({ email, query, attachments }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.TO_EMAIL,
      subject: "Unsplash query",
      html: `
      <strong>Query from ${email} </strong>
      <p>
        ${query}
      </p>
      `,
      attachments,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
