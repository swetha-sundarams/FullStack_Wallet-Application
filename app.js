const express = require('express');
const cors = require('cors');
const prisma = require('@prisma/client');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');
const transactionRoutes = require('./routes/transaction');
const trpcRoutes = require('./routes/trpc');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/trpc', trpcRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
