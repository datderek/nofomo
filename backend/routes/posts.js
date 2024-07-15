const express = require('express');
const db = require('../config/database');
const postSchema = require('../schema/post');

const router = express.Router();

// Create a new post
router.post('/', async (req, res, next) => {
  let {
    title,
    location = null,
    body = null,
    media = null,
    tags = null,
    eventStart = null,
    eventEnd = null,
  } = req.body;

  try {
    // Validates request body and sets empty strings (ommitted optional fields) to null
    ({ title, location, body, media, tags, eventStart, eventEnd } =
      await postSchema.validateAsync(
        { title, location, body, media, tags, eventStart, eventEnd },
        { abortEarly: false }
      ));

    const sql =
      'INSERT INTO `posts` (`title`, `location`, `body`, `media`, `tags`, `event_start`, `event_end`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.execute(sql, [
      title,
      location,
      body,
      media,
      tags,
      eventStart,
      eventEnd,
    ]);

    res.status(201).send({
      message: 'Post created successfully',
      title,
      postId: result.insertId,
    });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  if (err.isJoi) {
    // Joi validation error
    res.status(422).send({ error: err.details.map((e) => e.message) });
  } else {
    // Generic or database error
    console.log(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
