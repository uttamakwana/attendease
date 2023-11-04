const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        // require: true,
    },
    eid: {
        type: String,
        require: true,
        // unique: true
    },
    mobileno: {
        type: Number,
        // require:true,
        unique: true,
    },
    email: {
        type: String,
        // require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const User = mongoose.model("users",userSchema);
module.exports = User;
