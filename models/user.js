const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcryptHelper = require('../helpers/bcrypt')

const userSchema = new Schema({
    email : {
        type: String,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {
        type: String,
        required: [true, 'name must be filled']
    },
    password: {
        type: String,
        required: [true, 'password must be filled']
    }
})

userSchema.pre('save', function(next) {
    this.password = bcryptHelper.hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User