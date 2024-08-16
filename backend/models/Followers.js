const db = require('../config/database');
const { NotFoundError, DatabaseError } = require('../utils/errors');
const Users = require('./Users');

class Followers {
  // Checks if the current user is following the provided user
  //   Returns the object with all the columns of the followers
  //   Throws an error if there is no following relationship between the two users
  static async getFollowStatus(followingUserId, followedUserId) {
    const sql =
      'SELECT * FROM `followers` WHERE `following_user_id` = ? AND `followed_user_id` = ?';
    const [result] = await db.execute(sql, [followingUserId, followedUserId]);

    if (result.length !== 1) {
      throw new NotFoundError(`User is not being followed`);
    }

    return result[0];
  }

  // Creates a following relationship between the two provided users
  //   Returns the id of the newly created following relationship
  static async createFollow(followingUserId, followedUserId) {
    try {
      const sql =
        'INSERT INTO `followers` (`following_user_id`, `followed_user_id`) VALUES (?, ?)';
      const [result] = await db.execute(sql, [followingUserId, followedUserId]);

      return result.insertId;
    } catch (err) {
      throw new DatabaseError(
        `Failed to follow user with id: ${followedUserId}`
      );
    }
  }

  // Deletes the following relationship between the two provided user
  static async deleteFollow(followingUserId, followedUserId) {
    const sql =
      'DELETE FROM `followers` WHERE `following_user_id` = ? AND `followed_user_id` = ?';
    const [result] = await db.execute(sql, [followingUserId, followedUserId]);

    return result;
  }

  // Get all of the followers of a user
  //   Returns the list of followers
  static async getFollowersByUsername(username) {
    const followedUserId = await Users.getUserIdByUsername(username);
    const sql =
      'SELECT `users`.`username` FROM `followers` JOIN `users` ON `users`.`id` = `followers`.`following_user_id` WHERE `followed_user_id` = ?';
    let [result] = await db.execute(sql, [followedUserId]);

    result = result.map((item) => item.username);

    return result;
  }

  // Get the follower count of a user
  //   Returns the follower count
  static async getFollowerCountByUsername(username) {
    const followedUserId = await Users.getUserIdByUsername(username);
    const sql = 'SELECT COUNT(*) FROM `followers` WHERE `followed_user_id` = ?';
    let [result] = await db.execute(sql, [followedUserId]);

    return result[0]['COUNT(*)'];
  }

  // Get all the users that a user is following
  //   Returns the list of users following
  static async getFollowingByUsername(username) {
    const followingUserId = await Users.getUserIdByUsername(username);
    const sql =
      'SELECT `users`.`username` FROM `followers` JOIN `users` ON `users`.`id` = `followers`.`followed_user_id` WHERE `following_user_id` = ?';
    let [result] = await db.execute(sql, [followingUserId]);

    result = result.map((item) => item.username);

    return result;
  }

  // Get the count of all users a user is following
  //   Returns the following count
  static async getFollowingCountByUsername(username) {
    const followingUserId = await Users.getUserIdByUsername(username);
    const sql =
      'SELECT COUNT(*) FROM `followers` WHERE `following_user_id` = ?';
    let [result] = await db.execute(sql, [followingUserId]);

    return result[0]['COUNT(*)'];
  }
}

module.exports = Followers;
