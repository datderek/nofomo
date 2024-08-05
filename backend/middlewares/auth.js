const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { AuthenticationError } = require('../utils/errors');

const requireAuth = (req, res, next) => {
  ClerkExpressRequireAuth()(req, res, (err) => {
    if (err) {
      next(new AuthenticationError('Unauthenticated'));
    } else {
      next();
    }
  });
};

module.exports = { requireAuth };
