const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true,
    },
    aid: {
        type: String,
        require: true,
        unique: true,
    },
    mobileno: {
        type: Number,
        require:true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const admin_Schema = mongoose.model("admindata",adminSchema);
module.exports = admin_Schema;