const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const router = express.Router();
const SECRET = process.env.JWT_SECRET;

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({ data: { username, email, password } });
    const token = jwt.sign({ id: user.id }, SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user.id }, SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(403).json({ error: 'Invalid login' });
  }
});

module.exports = router;
