
const nodemailer = require('nodemailer');


const newMail = async (req, res) => {
    console.log("rea.body in newMail ",req.body)
  const { recipient, pdf } = req.body;

  // Create a transporter using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.SenderMail,
      pass: process.env.Pass
    },
  });



  // Define the email options
  const mailOptions = {
    from: `"CoWo Team" ${SenderMail}`,
    to: recipient,
    subject: 'Booking Confirmation',
    text: 'Please find attached PDF',
    html: `<a href='${pdf}'>Download your pdf here</a>`
  };

  // Send the email
  await transporter.sendMail(mailOptions);
  res.status(200).send('Email sent with PDF link');
};

module.exports = {newMail};