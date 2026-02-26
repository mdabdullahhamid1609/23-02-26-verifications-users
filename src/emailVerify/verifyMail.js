import nodemailer from "nodemailer";

export const verifyMail = async (token, email) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPass,
    },
  });

  const mailConfigurations = {
    from: process.env.mailUser,
    to: email,
    subject: "Email Verification",
    text: `Hello User, Kindly Verify ${token} `
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      throw new Error(error);
    }
    console.log("Email Sent Successfully");
    console.log(info);
  });
}