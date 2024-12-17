const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middleware/authenticate');

const prisma = new PrismaClient();
const router = express.Router();

// Get wallet details
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.findUnique({ where: { id: parseInt(id) } });
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create wallet
router.post('/', authenticate, async (req, res) => {
  const { balance } = req.body;
  try {
    const wallet = await prisma.wallet.create({
      data: { userId: req.user.id, balance },
    });
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
