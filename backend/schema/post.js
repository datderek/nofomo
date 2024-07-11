const Joi = require('joi');

// Post schema
// Allows for null as missing optional fields will be set to null
const schema = Joi.object({
  title: Joi.string().max(150).required(),

  body: Joi.string().allow(null),

  location: Joi.string().allow(null),

  media: Joi.array().items(Joi.string().uri()).allow(null),

  tags: Joi.array().items(Joi.string()).allow(null),

  // Ensures timestamp is in the MySQL format
  eventStart: Joi.string()
    .pattern(new RegExp('^d{4}-d{2}-d{2} d{2}:d{2}:d{2}$'))
    .allow(null)
    .message('eventStart must be in the format of `YYYY-MM-DD hh:dd:ss`'),

  eventEnd: Joi.string()
    .pattern(new RegExp('^d{4}-d{2}-d{2} d{2}:d{2}:d{2}$'))
    .allow(null)
    .message('eventEnd must be in the format of `YYYY-MM-DD hh:dd:ss`'),
});

module.exports = schema;
