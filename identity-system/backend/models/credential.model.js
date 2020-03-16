const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const credentialSchema = new Schema({
  Company: {
    type: String, required: true,
    trim: true,
    minlength: 1
  },
  Recipient: {
    type: String, required: true, unique: true,
    trim: true,
    minlength: 1
  },
  Credential_Name: {
    type: String, required: true, unique: true,
    trim: true,
    minlength: 1
  },
  Credential_Fields: { type: Array, required: true, trim: true },
  Credential_Hash: {
    type: String, required: true, unique: true,
    trim: true
  }
});

const Credential = mongoose.model('Credential', credentialSchema);

module.exports = Credential;