const { postModel } = require("../models/post.model");

const postController = async (req, res) => {
  let { title, description, userId } = req.body;
  const post = new postModel({
    title,
    description,
    userId,
  });
  await post.save();
  res.send(post);
};

const getPostsController = async (req, res) => {
  let data = await postModel.find();
  res.send(data);
};

const likesController = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findOne({ _id: postId });
    if (post.likes.includes(postId)) {
      res.status(403).json("post is already liked");
    } else {
      await post.updateOne({ $push: { likes: req.params.id } });
      res.status(200).json("post liked");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

const unlikeController = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findOne({ _id: postId });
    if (!post.likes.includes(postId)) {
      res.status(403).json("post not in likes list, can't unlike");
    } else {
      await post.updateOne({ $pull: { likes: postId } });
      res.status(200).json("post unliked");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

module.exports = {
  postController,
  getPostsController,
  likesController,
  unlikeController,
};
