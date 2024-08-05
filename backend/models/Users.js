const db = require('../config/database');
const { NotFoundError, DatabaseError } = require('../utils/errors');

class Users {
  // Retrieves the internal user id associated with the Clerk id
  //   Returns the user id
  //   Throws an error if there no user associated with the id
  static async getUserByClerkId(clerkId) {
    const sql = `SELECT id FROM users WHERE clerk_id = ?`;
    try {
      const [result] = await db.execute(sql, [clerkId]);

      if (result.length === 0) {
        throw new NotFoundError(`No user found with clerkId: ${clerkId}`);
      }

      return result[0].id;
    } catch (err) {
      throw new DatabaseError(
        'Failed database transaction: Unable to retrieve user id'
      );
    }
  }

  // Creates a new user
  //   Returns the id of the newly created user
  static async createUser(clerkId, username, email, firstName, lastName) {
    try {
      const sql =
        'INSERT INTO `users` (`clerk_id`, `username`, `email`, `first_name`, `last_name`) VALUES (?, ?, ?, ?, ?)';
      const [result] = await db.execute(sql, [
        clerkId,
        username,
        email,
        firstName,
        lastName,
      ]);
      return result.insertId;
    } catch (err) {
      throw new DatabaseError(
        'Failed database transaction: Unable to create user'
      );
    }
  }

  // Updates the user with the given clerk id
  static async updateUser(clerkId, username, email, firstName, lastName) {
    try {
      const sql =
        'UPDATE `users` SET `username` = ?, `email` = ?, `first_name` = ?, `last_name` = ? WHERE `clerk_id` = ?';
      await db.execute(sql, [username, email, firstName, lastName, clerkId]);
    } catch (err) {
      throw new DatabaseError(
        `Failed database transaction: Unable to update user with clerkId: ${clerkId}`
      );
    }
  }

  // Removes the user with the given clerk id
  static async deleteUser(clerkId) {
    try {
      const sql = 'DELETE FROM `users` WHERE `clerk_id` = ?';
      await db.execute(sql, [clerkId]);
    } catch (err) {
      throw new DatabaseError(
        `Failed database transaction: Unable to delete user with clerkId: ${clerkId}`
      );
    }
  }
}

module.exports = Users;
