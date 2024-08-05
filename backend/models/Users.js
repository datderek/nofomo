const db = require('../config/database');
const { NotFoundError } = require('../utils/errors');

class Users {
  // Retrieves the internal user id associated with the Clerk id
  //   Returns the user id
  //   Throws an error if there no user associated with the id
  static async getUserByClerkId(clerkId) {
    const sql = `SELECT id FROM users WHERE clerk_id = ?`;
    const [result] = await db.execute(sql, [clerkId]);

    if (result.length === 0) {
      throw new NotFoundError(`No user found with clerkId: ${clerkId}`);
    }

    return result[0].id;
  }
}

module.exports = Users;
