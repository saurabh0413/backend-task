const { commentModel } = require("../models/comment.model");
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
      res.status(403).json({ msg: "post is already liked" });
    } else {
      await post.updateOne({ $push: { likes: req.params.id } });
      res.status(200).json({ msg: "post liked" });
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

const commentController = async (req, res) => {
  try {
    const { comment } = req.body;
    const postId = req.params.id;
    const Comment = new commentModel({
      comment,
      postId,
    });
    await Comment.save();
    const Post = await postModel.findOne({ _id: postId });
    await Post.updateOne({ $push: { comments: Comment } });
    //  res.send(Comment._id);
     res.status(200).json({ comment: Comment._id });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

const deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId);
    const { userId } = req.body;
    const post = await postModel.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: "post not available" });
    }

    await postModel.deleteOne(post);

    return res.send({ message: "post deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

const singlepostController = async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id });
  const post1 = {
    title: post.title,
    description: post.description,
    like: post.likes.length,
    comments: post.comments.length,
  };
  res.send(post1);
};

const allPostController = async (req, res) => {
  try {
    const getPosts = await postModel
      .find({ userId: req.body.userId })
      .select("title description comments likes createdAt _id")
      .sort({ ["createdAt"]: -1 })
      .populate({ path: "comments" })
      .lean();

    getPosts.map((post) => {
      post.comments.map((comme, index) => {
        post.comments[index] = { comment: comme.comment };
      });
      post.likes = post.likes.length;
    });

    res.send(getPosts);
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
  commentController,
  deletePostController,
  singlepostController,
  allPostController,
};
