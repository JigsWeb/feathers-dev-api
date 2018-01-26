const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    _article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    text: String,
});

module.exports = mongoose.model('Comment', CommentSchema);