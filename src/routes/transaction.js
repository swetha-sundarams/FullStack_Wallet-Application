const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middleware/authenticate');

const prisma = new PrismaClient();
const router = express.Router();

// Get all transactions
router.get('/:walletId', authenticate, async (req, res) => {
  const { walletId } = req.params;
  try {
    const transactions = await prisma.transaction.findMany({
      where: { walletId: parseInt(walletId) },
    });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add transaction
router.post('/', authenticate, async (req, res) => {
  const { walletId, type, amount, category } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: { walletId, type, amount, category },
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
