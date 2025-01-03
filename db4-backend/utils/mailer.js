
import nodemailer from 'nodemailer';
import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

// Force DNS to resolve to IPv4 addresses only
dns.setDefaultResultOrder('ipv4first');

console.log('User:', process.env.USER); // Debugging
console.log('Pass:', process.env.PASS); // Debugging

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Explicit hostname
  port: 465,               // SSL port
  secure: true,            // Use SSL
  auth: {
    user: process.env.USER, // Your email
    pass: process.env.PASS, // App-specific password
  },
  tls: {
    rejectUnauthorized: false, // Ignore SSL certificate errors for testing
  },
});


// Function to send OTP email
export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.USER,              // Sender's email address
    to: email,                           // Recipient's email address
    subject: 'OTP for Email Verification', // Subject of the email
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,  // Email body
  };

  try {
    // Sending the email
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully!');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Error sending OTP email');
  }
};

