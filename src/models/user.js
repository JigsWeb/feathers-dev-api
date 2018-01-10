const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
});

module.exports = mongoose.model('User', UserSchema);