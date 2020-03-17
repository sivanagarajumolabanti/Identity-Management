const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Credential_EntitySchema = new Schema({

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
const Credential_Entity = mongoose.model('EntityOwners', Credential_EntitySchema)
module.exports = Credential_Entity;

