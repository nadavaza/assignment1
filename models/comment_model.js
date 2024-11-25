const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  writer: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, // References the Post model
    ref: "Posts",
    required: true,
  },
});

const commentModel = mongoose.model("Comments", commentSchema);

module.exports = commentModel;
