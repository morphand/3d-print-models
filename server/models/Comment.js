const mongoose = require("mongoose");

// comment creator
// model commented
// date

const CommentSchema = mongoose.Schema({});

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
