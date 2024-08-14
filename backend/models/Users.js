const db = require('../config/database');
const { NotFoundError, DatabaseError } = require('../utils/errors');

class Users {
  // Retrieves the internal user id associated with the Clerk id
  //   Returns the user id
  //   Throws an error if there no user associated with the id
  static async getUserIdByClerkId(clerkId) {
    const sql = 'SELECT `id` FROM `users` WHERE `clerk_id` = ?';
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

  // Retrieves the internal user id associated with the username
  //   Returns the user id
  //   Throws an error if there no user associated with the id
  static async getUserIdByUsername(username) {
    const sql = 'SELECT `id` FROM `users` WHERE `username` = ?';
    const [result] = await db.execute(sql, [username]);

    if (result.length === 0) {
      throw new NotFoundError(`No user found with username: ${username}`);
    }

    return result[0].id;
  }

  // Retrieves a user by id
  //   Returns an object with all the columns of the user
  //   Throws an error if there is no user associated with the id
  static async getUserById(userId) {
    const sql = 'SELECT * FROM `users` WHERE `id` = ?';
    const [result] = await db.execute(sql, [userId]);

    if (result.length !== 1) {
      throw new NotFoundError(`No user found with id: ${userId}`);
    }

    return result[0];
  }

  // Retrieves a user by username
  //   Return an object with all the columns of the user
  //   Throw an error if there is no user associated with the username
  static async getUserByUsername(username) {
    const sql = 'SELECT * FROM `users` WHERE `username` = ?';
    const [result] = await db.execute(sql, [username]);

    if (result.length !== 1) {
      throw new NotFoundError(`No user found with username: ${username}`);
    }

    return result[0];
  }

  // Retrieves a user by clerk_id
  //   Return an object with all the columns of the user
  //   Throw an error if there is no user associated with the Clerk id
  static async getUserByClerkId(clerkId) {
    const sql = 'SELECT * FROM `users` WHERE `clerk_id` = ?';
    const [result] = await db.execute(sql, [clerkId]);

    if (result.length !== 1) {
      throw new NotFoundError(`No user found with Clerk ID: ${clerkId}`);
    }

    return result[0];
  }

  // Creates a new user
  //   Returns the id of the newly created user
  static async createUser(
    clerkId,
    username,
    email,
    firstName,
    lastName,
    imageUrl
  ) {
    try {
      const sql =
        'INSERT INTO `users` (`clerk_id`, `username`, `email`, `first_name`, `last_name`, `image_url`) VALUES (?, ?, ?, ?, ?, ?)';
      const [result] = await db.execute(sql, [
        clerkId,
        username,
        email,
        firstName,
        lastName,
        imageUrl,
      ]);
      return result.insertId;
    } catch (err) {
      throw new DatabaseError(
        'Failed database transaction: Unable to create user'
      );
    }
  }

  // Updates the user with the given clerk id
  static async updateUser(
    clerkId,
    username,
    email,
    firstName,
    lastName,
    imageUrl
  ) {
    try {
      const sql =
        'UPDATE `users` SET `username` = ?, `email` = ?, `first_name` = ?, `last_name` = ?, `image_url` = ? WHERE `clerk_id` = ?';
      await db.execute(sql, [
        username,
        email,
        firstName,
        lastName,
        imageUrl,
        clerkId,
      ]);
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
