const db = require('../config/database');
const { NotFoundError, DatabaseError } = require('../utils/errors');

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
}

module.exports = Followers;
