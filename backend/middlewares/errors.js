const {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  BadRequestError,
  DatabaseError,
  S3Error,
} = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  // Default code, status, and error message:
  let statusCode = 500;
  let status = 'error';
  let message = err.message || 'Internal server error';

  if (err instanceof AuthenticationError) {
    statusCode = 401;
    status = 'fail';
  }

  if (err instanceof AuthorizationError) {
    statusCode = 401;
    status = 'fail';
  }

  // Joi Validation Error
  if (err.isJoi) {
    statusCode = 400;
    status = 'fail';
  }

  if (err instanceof NotFoundError) {
    statusCode = 404;
    status = 'fail';
  }

  if (err instanceof BadRequestError) {
    statusCode = 400;
    status = 'fail';
  }

  if (err instanceof DatabaseError) {
    statusCode = 500;
    status = 'error';
  }
  if (err instanceof S3Error) {
    statusCode = 500;
    status = 'error';
  }

  // Log the error for debugging
  console.error(err);

  const body = { status };

  if (status === 'fail') {
    body.data = { message };
  } else {
    body.message = message;
  }

  res.status(statusCode).json(body);
};

module.exports = { errorHandler };
