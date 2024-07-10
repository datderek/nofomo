const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  const { title, location, body, media, tags, eventStart, eventEnd } = req.body;

  if (!title) {
    res.status(400).send({ error: 'Missing required title' });
    return;
  }

  try {
    const sql =
      'INSERT INTO `posts` (`title`, `location`, `body`, `media`, `tags`, `event_start`, `event_end`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
      title,
      location || null,
      body || null,
      media || null,
      tags || null,
      eventStart || null,
      eventEnd || null,
    ];
    const [result] = await db.execute(sql, values);
    console.log(result);

    res.status(201).send({
      message: 'Post created successfully',
      title,
      postId: result['insertId'],
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

module.exports = router;
