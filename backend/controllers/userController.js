const Posts = require('../models/Posts');
const { getPresignedUrl } = require('../services/s3');
const { camelizeKeys } = require('../utils/utils');

const getUserPosts = async (req, res, next) => {
  const { userId } = req.params;

  try {
    let posts = await Posts.getPostsByUserId(userId);

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

module.exports = { getUserPosts };
