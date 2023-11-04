const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    eid: {
        type: String,
        require: true,
        // unique: true,
    },
    name: {
     type: String,
     // require: true,
    },
    intime: {
        type: Date,
        default: Date.now
    },
    outtime: {
        type: Date,
        // default: Date.now
    },
    attendance: {
        type: Boolean,
        // require: true,
    }
});

const Attendance = mongoose.model("attendancedata", attendanceSchema);
module.exports = Attendance;
