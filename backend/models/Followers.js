const db = require('../config/database');
const { DatabaseError } = require('../utils/errors');

class Followers {
  static async createFollow(followingUserId, followedUserId) {
    try {
      const sql =
        'INSERT INTO `followers` (`following_user_id`, `followed_user_id`) VALUES (?, ?)';
      const [result] = await db.execute(sql, [followingUserId, followedUserId]);

      return result.insertId;
    } catch (err) {
      console.log(err);
      throw new DatabaseError(
        `Failed to follow user with id: ${followedUserId}`
      );
    }
  }
}

module.exports = Followers;
