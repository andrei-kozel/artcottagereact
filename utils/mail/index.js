const nodemailer = require("nodemailer");

const keys = require("../../config/keys");

const getEmailData = (to, name, phone, text, token, template) => {
  let data = null;

  switch (template) {
    case "request":
      data = {
        from: '"ArtCottage" <art.cottage.noreply@gmail.com>', // sender address
        to: "bexxxa38@gmail.com", // list of receivers
        subject: "Nya medelande", // Subject line
        text: "Medelande", // plain text body
        html: `
                <h2>ArtCottage. Nya medelande</h2>
                <ul>
                    <li>Namn: ${name}</li>
                    <li>Email: ${to}</li>
                    <li>Tel. nummer: ${phone}</li>
                </ul>
                <h3>Medelande:</h3>
                <p>${text}</p>
              ` // html body
      };
      break;
    default:
      data;
  }

  return data;
};

const sendEmail = (to, name, phone, text, token, template) => {
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "art.cottage.noreply@gmail.com", // generated ethereal user
      pass: keys.mailpassword // generated ethereal password
    }
  });

  const mailOptions = getEmailData(to, name, phone, text, token, template);

  smtpTransport.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent");
      smtpTransport.close();
    }
  });
};

module.exports = { sendEmail };
