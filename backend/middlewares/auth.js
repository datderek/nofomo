const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.isAuth = true;
  }
}

const requireAuth = (req, res, next) => {
  ClerkExpressRequireAuth()(req, res, (err) => {
    if (err) {
      // If there's an error from ClerkExpressRequireAuth, throw a custom error
      next(new AuthenticationError('Unauthenticated'));
    } else {
      // Continue if no error
      next();
    }
  });
};

module.exports = { requireAuth };
