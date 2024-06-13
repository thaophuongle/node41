import nodemailer from "nodemailer";

export const sendMail = (to, subject, text) => {
  let configMail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thaolephuong9812@gmail.com",
      pass: "lasaudvdpuxigfqv",
    },
  });

  let infoMail = {
    from: "thaolephuong9812@gmail.com",
    to,
    subject,
    text,
  };
  configMail.sendMail(infoMail, (err, info) => err);
};
