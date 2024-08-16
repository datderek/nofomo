const Followers = require('../models/Followers');
const Posts = require('../models/Posts');
const Users = require('../models/Users');
const { getPresignedUrl } = require('../services/s3');
const { camelizeKeys } = require('../utils/utils');

const getUser = async (req, res, next) => {
  const { username } = req.params;

  try {
    let user = await Users.getUserByUsername(username);

    user = camelizeKeys(user);

    res.status(200).send({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserPosts = async (req, res, next) => {
  const { username } = req.params;
  const { page, limit } = req.query;

  try {
    let posts = [];

    if (page && limit) {
      // Get paginated posts
      posts = await Posts.getPaginatedPostsByUsername(username, page, limit);
    } else {
      // Get all posts
      posts = await Posts.getPostsByUsername(username);
    }

    // Presigns S3 object urls of posts (and converts the keys to camelCase)
    posts = await Promise.all(
      posts.map(async (post) => {
        post.image_url = await getPresignedUrl(post.image_url);
        post = camelizeKeys(post);
        return post;
      })
    );

    res.status(200).send({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getFollowStatus = async (req, res, next) => {
  const { userId: clerkId } = req.auth;
  const { username } = req.params;

  try {
    const followingUserId = await Users.getUserIdByClerkId(clerkId);
    const followedUserId = await Users.getUserIdByUsername(username);

    // Model will throw error if following relationship not found
    await Followers.getFollowStatus(followingUserId, followedUserId);

    res.status(200).send({
      status: 'success',
      data: {
        message: `${username} is followed by the current user.`,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createFollow = async (req, res, next) => {
  const { userId: clerkId } = req.auth;
  const { username } = req.params;

  try {
    const followingUserId = await Users.getUserIdByClerkId(clerkId);
    const followedUserId = await Users.getUserIdByUsername(username);

    const insertId = await Followers.createFollow(
      followingUserId,
      followedUserId
    );

    res.status(201).send({
      status: 'success',
      data: {
        message: `Successfully followed ${username}`,
        followId: insertId,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser, getUserPosts, getFollowStatus, createFollow };
