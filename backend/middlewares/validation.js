const postSchema = require('../schema/post');

const validatePost = async (req, res, next) => {
  // If optional fields are omitted in the req. body initialize them to null
  let {
    title,
    location = null,
    body = null,
    eventStart = null,
    eventEnd = null,
  } = req.body;

  try {
    // Validates request body and sets empty strings (included but empty optional fields) to null
    const validatedData = await postSchema.validateAsync(
      { title, location, body, eventStart, eventEnd },
      { abortEarly: false }
    );

    // Updates the request body with the empty strings set to null (for mysql insertion)
    req.body = { ...validatedData };
  } catch (err) {
    next(err);
  }

  next();
};

module.exports = { validatePost };
