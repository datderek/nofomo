const Followers = require('../models/Followers');
const Posts = require('../models/Posts');
const Users = require('../models/Users');
const { getPresignedUrl } = require('../services/s3');
const { NotFoundError } = require('../utils/errors');
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

const getProfileData = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await Users.getUserByUsername(username);
    const postCount = await Posts.getPostCountByUsername(username);
    const followerCount = await Followers.getFollowerCountByUsername(username);
    const followingCount =
      await Followers.getFollowingCountByUsername(username);
    const profileData = {
      ...camelizeKeys(user),
      postCount,
      followerCount,
      followingCount,
    };

    res.status(200).send({
      status: 'success',
      data: {
        profileData,
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

const getUserPostCount = async (req, res, next) => {
  const { username } = req.params;

  try {
    const postCount = await Posts.getPostCountByUsername(username);

    res.status(200).send({
      status: 'success',
      data: {
        postCount,
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

const getFollowers = async (req, res, next) => {
  const { username } = req.params;

  try {
    const followers = await Followers.getFollowersByUsername(username);

    res.status(200).send({
      status: 'success',
      data: {
        followers,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getFollowerCount = async (req, res, next) => {
  const { username } = req.params;

  try {
    const followerCount = await Followers.getFollowerCountByUsername(username);

    res.status(200).send({
      status: 'success',
      data: {
        followerCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getFollowing = async (req, res, next) => {
  const { username } = req.params;

  try {
    const following = await Followers.getFollowingByUsername(username);

    res.status(200).send({
      status: 'success',
      data: {
        following,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getFollowingCount = async (req, res, next) => {
  const { username } = req.params;

  try {
    const followingCount =
      await Followers.getFollowingCountByUsername(username);

    res.status(200).send({
      status: 'success',
      data: {
        followingCount,
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

const deleteFollow = async (req, res, next) => {
  const { userId: clerkId } = req.auth;
  const { username } = req.params;

  try {
    const followingUserId = await Users.getUserIdByClerkId(clerkId);
    const followedUserId = await Users.getUserIdByUsername(username);

    const result = await Followers.deleteFollow(
      followingUserId,
      followedUserId
    );

    if (result.affectedRows >= 1) {
      res.status(200).send({
        status: 'success',
        data: {
          message: `Successfully unfollowed ${username}`,
        },
      });
    } else {
      throw new NotFoundError('No following relationship found.');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getProfileData,
  getUserPosts,
  getUserPostCount,
  getFollowStatus,
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowerCount,
  getFollowing,
  getFollowingCount,
};
