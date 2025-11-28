import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {OTP}  from "../controllers/authentication/forget_password.js";

dotenv.config(); // Load environment variables

export const sendOtpEmail = async (email) => {
    const generated_otp = OTP(); // Call the OTP function to generate a random OTP
  try {
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"RentKaro Security" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Your OTP Code - RentKaro",
      text: `Your OTP code is: ${generated_otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb;">
          <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            <h2 style="text-align: center; color: #16a34a;">🔐 OTP Verification</h2>
            
            <p style="font-size: 16px; color: #333;">Dear User,</p>
            <p style="font-size: 16px; color: #333;">
              Your One-Time Password (OTP) for verification is:
            </p>

            <div style="text-align: center; margin: 20px 0;">
              <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #16a34a; letter-spacing: 2px; border: 2px dashed #16a34a; padding: 10px 20px; border-radius: 8px;">
                ${generated_otp}
              </span>
            </div>

            <p style="font-size: 14px; color: #555;">
              This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.
            </p>

            <p style="margin-top: 20px; font-size: 14px; color: #777;">
              Regards, <br/>
              RentKaro Security Team
            </p>

            <div style="text-align: center; font-size: 12px; color: #999; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
              © 2025 RentKaro. All rights reserved.
            </div>
          </div>
        </div>
      `,
    });

    return { success: true, message: "OTP email sent successfully!", otp: generated_otp };
  } catch (error) {
    console.error("Error sending OTP email: ", error);
    return { success: false, message: "Failed to send OTP email!", otp: null };
  }
};
