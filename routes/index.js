// routes/index.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Homepage
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// About
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

// Projects
router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

// Contact (GET)
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', success: null });
});

// Contact (POST)
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // sends to your own inbox
      subject: `New contact from ${name}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.render('contact', {
      title: 'Contact',
      success: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Email error:', error);
    res.render('contact', {
      title: 'Contact',
      success: 'Something went wrong. Please try again.',
    });
  }
});

module.exports = router;
