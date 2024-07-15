const Joi = require('joi');

// Post schema
// Allows for empty strings as React will send "" when user omits a field
// Allows for null as users can omit the field in the request body when sending a direct request
// Allows for em
const schema = Joi.object({
  title: Joi.string().max(150).required(),

  body: Joi.string().empty('').default(null).allow(null),

  location: Joi.string().empty('').default(null).allow(null),

  media: Joi.array()
    .items(Joi.string().uri())
    .empty(Joi.array().length(0))
    .default(null)
    .allow(null),

  tags: Joi.array()
    .items(Joi.string())
    .empty(Joi.array().length(0))
    .default(null)
    .allow(null),

  // Ensures timestamp is in the MySQL format
  eventStart: Joi.string()
    .empty('')
    .default(null)
    .allow(null)
    .pattern(new RegExp('^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$'))
    .messages({
      'string.pattern.base':
        '"eventStart" must be in the format of YYYY-MM-DD hh:dd:ss',
    }),

  eventEnd: Joi.string()
    .empty('')
    .default(null)
    .allow(null)
    .pattern(new RegExp('^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$'))
    .messages({
      'string.pattern.base':
        '"eventEnd" must be in the format of YYYY-MM-DD hh:dd:ss',
    }),
});

module.exports = schema;
