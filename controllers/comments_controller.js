const CommentModel = require("../models/comment_model");

const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.send(comments);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await CommentModel.find({ postId });
    if (comments.length > 0) {
      res.send(comments);
    } else {
      res.status(404).send("No comments found for this post.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createComment = async (req, res) => {
  const commentData = req.body;
  try {
    const newComment = await CommentModel.create(commentData);
    res.status(201).send(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      { $set: { content } },
      { new: true, runValidators: true }
    );
    if (updatedComment) {
      res.send(updatedComment);
    } else {
      res.status(404).send("Comment not found.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(id);
    if (deletedComment) {
      res.send(deletedComment);
    } else {
      res.status(404).send("Comment not found.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllComments,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
