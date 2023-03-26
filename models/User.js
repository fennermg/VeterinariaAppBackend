const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    date:{type:String,default: Date.now}
})

module.exports = mongoose.model('User', userSchema)