const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
