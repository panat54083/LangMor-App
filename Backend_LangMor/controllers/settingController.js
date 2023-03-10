const nodemailer = require("nodemailer");

exports.sendReport = (req, res) => {
    const {subject, message, sender, app} = req.body
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.APPLICATION_EMAIL,
            pass: process.env.APPLICATION_PASSWORD,
        },
    });

    var mailOptions = {
        from: process.env.APPLICATION_EMAIL,
        to: process.env.APPLICATION_EMAIL,
        subject: `Report From LangMor ${app}: ${subject}`,
        text: `Sender: ${sender}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
