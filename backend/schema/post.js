const Joi = require('joi');

// Post schema
// Allows for empty strings as React will send "" when user omits a field
// Allows for null as users can omit the field in the request body when sending a direct request
const schema = Joi.object({
  title: Joi.string().max(150).required(),

  body: Joi.string().empty('').default(null).allow(null),

  location: Joi.string().empty('').default(null).allow(null),

  eventStart: Joi.date().empty('').default(null).allow(null),

  eventEnd: Joi.date().empty('').default(null).allow(null),
});

module.exports = schema;
