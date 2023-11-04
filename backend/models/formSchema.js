const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    userid: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: false,
    },
    keyid: {
        type: String,
        require: false,
    },
    doc: [Object],
});

const form_Schema = mongoose.model("formdata",formSchema);
module.exports = form_Schema;