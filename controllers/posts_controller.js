const PostModel = require("../models/posts_model");

const getAllPosts = async (req, res) => {
  const filter = req.query.sender;
  try {
    if (filter) {
      const posts = await PostModel.find({ sender: filter });
      res.send(posts);
    } else {
      const posts = await PostModel.find();
      res.send(posts);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await PostModel.deleteOne({ _id: postId });
    res.status(201).send(deletedPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { content } },
      { new: true, runValidators: true }
    );
    res.status(201).send(updatedPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPostById,
  updatePost,
};
