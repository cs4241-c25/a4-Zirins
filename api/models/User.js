const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchemaz = new mongoose.Schema({
    username: { type: String, unique: true, sparse: true }, // Unique username (for local auth)
    githubId: { type: String, unique: true, sparse: true }, // GitHub ID for OAuth
    displayName: String, // GitHub Display Name
    profileUrl: String, // GitHub Profile URL
    avatarUrl: String, // GitHub Avatar Image
});

// Enable local auth only for users who signed up with username/password
UserSchema.plugin(passportLocalMongoose, { usernameUnique: false });

module.exports = mongoose.model('User', UserSchema);
