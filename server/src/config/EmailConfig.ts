import nodemailer from "nodemailer";
import { GOOGLE_PASSWORD } from "../config/DotEnvConfig.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shadowshukla76@gmail.com",
    pass: GOOGLE_PASSWORD,
  },
});
export const sendVerificationEmail = async (
  to: string,
  verificationToken: string
) => {
  const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;
  await transporter.sendMail({
    from: '"Aditya Shukla" <shadowshukla76@gmail.com>',
    to: to,
    subject: "Verify your email",
    html: `
    <h1>Email Verification</h1>
    <p>Click the link below to verify your email:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `,
  });
};
