const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    text: String,
});

module.exports = mongoose.model('Article', ArticleSchema);