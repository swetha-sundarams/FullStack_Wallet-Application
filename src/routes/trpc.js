const { initTRPC } = require('@trpc/server');
const express = require('@trpc/server/adapters/express');

const t = initTRPC.create();

const appRouter = t.router({
  getUser: t.procedure.query(() => {
    return { id: 1, name: 'Admin User' };
  }),
});

const createContext = ({ req, res }) => ({ req, res });

module.exports = express.createExpressMiddleware({
  router: appRouter,
  createContext,
});
