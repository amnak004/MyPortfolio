import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import ContactMessage from './models/ContactMessage.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    if (!/^[^\s@]+@gmail\.com$/i.test(email.trim())) {
      return res.status(400).json({
        message: 'Please enter a valid Gmail address.',
      });
    }

    const newMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        replyTo: email.trim(),
        subject: `Portfolio Contact: ${subject.trim()}`,
        text: `
        New message from your portfolio

        Name: ${name.trim()}
        Email: ${email.trim()}
        Subject: ${subject.trim()}

        Message:
        ${message.trim()}
        `,
        });

    res.status(201).json({
      message: 'Message sent successfully!',
      id: newMessage._id,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    res.status(500).json({
      message: 'Something went wrong. Please try again.',
    });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });