const db = require('../config/database');

class Users {
  // Retrieves the internal user id associated with the Clerk id
  //   Returns the user id
  //   Throws an error if there is no user id found
  static async getUserByClerkId(clerkId) {
    const sql = `SELECT id FROM users WHERE clerk_id = ?`;
    const [result] = await db.execute(sql, [clerkId]);

    if (result.length === 0) {
      throw new Error('User not found');
    }

    return result[0].id;
  }
}

module.exports = Users;
