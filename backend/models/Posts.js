const db = require('../config/database');
const { DatabaseError, NotFoundError } = require('../utils/errors');

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
    try {
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
    } catch (err) {
      throw new DatabaseError(
        'Failed database transaction: Unable to create post'
      );
    }
  }

  // Retrieves the post associated with the id
  //   Returns an object with all the columns of the post
  //   Throws an error if there is no post associated with the id
  static async getPostById(postId) {
    const sql = 'SELECT * FROM `posts` WHERE `id` = ?';
    const [result] = await db.execute(sql, [postId]);

    if (result.length !== 1) {
      throw new NotFoundError(`No post found with id: ${postId}`);
    }

    return result[0];
  }

  // Retrieve all posts created by a user
  //   Returns an array of post objects (200)
  //   Throws an error if the user does not exist
  static async getPostsByUserId(userId) {
    const sql = 'SELECT * FROM `posts` WHERE `user_id` = ?';
    const [result] = await db.execute(sql, [userId]);

    return result;
  }
}

module.exports = Posts;
