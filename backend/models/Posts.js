const db = require('../config/database');

class Posts {
  // Creates a post on behalf of the authenticated user
  //   Returns the id of the newly created post
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

  // Retrieves the post associated with the id
  //   Returns an object with all the columns of the post
  static async getPostById(postId) {
    const sql = 'SELECT * FROM `posts` WHERE `id` = ?';
    const [result] = await db.execute(sql, [postId]);

    if (result.length !== 1) {
      throw new Error('Post not found');
    }

    return result[0];
  }
}

module.exports = Posts;
