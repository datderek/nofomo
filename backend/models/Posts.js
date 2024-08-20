const db = require('../config/database');
const Users = require('./Users');
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

  // Retrieve all posts created by a user (by userId)
  //   Returns an array of post objects (200)
  //   Throws an error if the user does not exist
  static async getPostsByUserId(userId) {
    const sql =
      'SELECT * FROM `posts` WHERE `user_id` = ? ORDER BY `created_at` DESC';
    const [result] = await db.execute(sql, [userId]);

    // If zero posts returned, check and throw an error if user doesn't exists
    if (result.length == 0) {
      await Users.getUserById(userId);
    }

    return result;
  }

  static async getPaginatedPostsByUserId(userId, page, limit) {
    const offset = ((page - 1) * limit).toString();
    const sql =
      'SELECT * FROM `posts` WHERE `user_id` = ? ORDER BY `created_at` DESC LIMIT ? OFFSET ?';
    const [result] = await db.execute(sql, [userId, limit, offset]);

    // If zero posts returned, check and throw an error if user doesn't exists
    if (result.length == 0) {
      await Users.getUserById(userId);
    }

    return result;
  }

  // Retrieve all posts created by a user (by username)
  //   Returns an array of post objects (200)
  //   Throws an error if the user does not exist
  // TODO: This could be more efficient via a join or subquery
  static async getPostsByUsername(username) {
    const userId = await Users.getUserIdByUsername(username);
    const result = await Posts.getPostsByUserId(userId);

    return result;
  }

  static async getPostCountByUsername(username) {
    const sql =
      'SELECT COUNT(*) FROM `posts` JOIN `users` ON `users`.`id` = `posts`.`user_id` WHERE `username` = ?';
    const [result] = await db.execute(sql, [username]);

    return result[0]['COUNT(*)'];
  }

  // Retrieve paginated posts created by a user (by username)
  //   Returns an aray of post objects (200)
  //   Throws an error if the user does not exist
  // TODO: This could be more efficient via a join or subquery
  static async getPaginatedPostsByUsername(username, page, limit) {
    const userId = await Users.getUserIdByUsername(username);
    const result = await Posts.getPaginatedPostsByUserId(userId, page, limit);

    return result;
  }
}

module.exports = Posts;
