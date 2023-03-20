const { loginModel } = require("../models/login.model");

const followController = async (req, res) => {
  try {
    let user = await loginModel.findOne({ _id: req.body.userId });
    let userFollow = await loginModel.findById(req.params.id);
    if (user) {
      if (user.following.includes(req.params.id)) {
        res.status(403).json("alreay in following list");
      } else {
        await user.updateOne({ $push: { following: req.params.id } });
        await userFollow.updateOne({ $push: { followers: req.body.userId } });
        res.status(200).json("user followed");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

const unfollowController = async (req, res) => {
  try {
    let user = await loginModel.findOne({ _id: req.body.userId });
    let userUnfollow = await loginModel.findById(req.params.id);
    if (!user.following.includes(req.params.id)) {
      res.status(403).json("user not in following list, can't unfollow");
    } else {
      await user.updateOne({ $pull: { following: req.params.id } });
      await userUnfollow.updateOne({ $pull: { followers: req.body.userId } });
      res.status(200).json("user unfollowed");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

module.exports = { followController, unfollowController };
