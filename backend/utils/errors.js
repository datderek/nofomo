// Failure in the authentication process (not able to authenticate user)
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

// Failure in the authorization process (not authorized for a specific API)
class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

// Failure to find data with given params
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Failure to retrieve data due to malformed request (missing data, invalid data type, etc.)
//   Note: ValidationError provided by Joi has some overlap and may be used instead
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}

// Catch-all for database related issues (connection, query, transaction errors)
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Catch-all for S3 related issues (connection, access, transaction errors)
class S3Error extends Error {
  constructor(message) {
    super(message);
    this.name = 'S3Error';
  }
}

module.exports = {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  BadRequestError,
  DatabaseError,
  S3Error,
};
