const db = require('../config/database');

class Posts {
  // Creates a post on behalf of the authenticated user
  static async createPost(
    userId,
    imageUrl,
    title,
    location,
    body,
    eventStart,
    eventEnd
  ) {
    const sql =
      'INSERT INTO `posts` (`user_id`, `image_url`, `title`, `location`, `body`, `event_start`, `event_end`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.execute(sql, [
      userId,
      imageUrl,
      title,
      location,
      body,
      eventStart,
      eventEnd,
    ]);
    return result.insertId;
  }
}

module.exports = Posts;
