// src/utils/mailer.ts
import nodemailer from "nodemailer";

export const sendResetEmail = async (to: string, token: string) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail", // or another provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. The link will expire in 15 minutes.</p>`,
    });
  } catch (error) {
    throw error;
  }
};
