const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String, required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String, required: true, unique: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String, required: true, unique: true,
        trim: true,
        minlength: 1
    },
    owner: {
        type: String, required: true, unique: true,
        trim: true,
        minlength: 1
    },
    usage_plan: { type: String, required: true, trim: true },
    API_key: {
        type: String, required: true, unique: true,
        trim: true
    }
});
const User = mongoose.model('users', UserSchema)
module.exports = User;

