const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    email: {
        type: String, required: true, unique: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String, required: true,
        trim: true,
        minlength: 1
    },
    Role: {
        type: String, required: true, unique: true,
        trim: true,
        minlength: 1
    },
    Phone_number: { type: Number, required: true, trim: true },
    
});
const user = mongoose.model('users', UserSchema)
module.exports = user;

