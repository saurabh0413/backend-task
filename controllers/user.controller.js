const userController = async (req, res) => {
  res.send(req.params.id);
};

module.exports = { userController };

