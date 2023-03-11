const nodemailer = require("nodemailer");

exports.sendReportOld = (req, res) => {
    const { subject, message, sender, app } = req.body;
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
        subject: `Report From LangMor ${app}`,
        text: `Header: ${subject}\nSender: ${sender}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(200).json({
                success: false,
                message: "Failed to send email.",
            });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).json({
                success: true,
                message: "Email sent successfully.",
            });
        }
    });
};

exports.sendReport = async (req, res) => {
    try {
        const { subject, message, sender, app } = req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.APPLICATION_EMAIL,
                pass: process.env.APPLICATION_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.APPLICATION_EMAIL,
            to: process.env.APPLICATION_EMAIL,
            subject: `Report From LangMor ${app}`,
            text: `Header: ${subject}\nSender: ${sender}\nMessage: ${message}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        res.status(200).json({
            success: true,
            message: "Email sent successfully.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to send email.",
        });
    }
};
