const User = require("../models/userSchema.js");
const Attendace = require("../models/attendanceSchema.js");
const Attendance = require("../models/attendanceSchema.js");

const login = async (req, res) => {
  try {
    const { eid, password } = req.body;
    console.log(eid, password);

    const user = await User.findOne({ eid });
    console.log(user);
    console.log("1");

    if (!user) return res.json({ success: false, message: "User not found!" });
    console.log("2");

    if (password !== user.password)
      return res.json({
        success: false,
        message: "e_id or password may be wrong!",
      });

    console.log("3");

    let attendance = await Attendance.findOne({ eid });

    if (attendance) {
      attendance = await Attendace.findOneAndUpdate(
        {
          eid,
        },
        { attendance: true }
      );
      return res.json({
        message: "User logged in successfully!",
        user,
        attendance,
      });
    } else {
      attendance = await Attendace.create({
        eid,
        name: user.fname,
        attendance: true,
      });
      return res.json({
        message: "User logged in successfully!",
        user,
        attendance,
      });
    }
    // attendance = await Attendace.create({
    //   eid,
    //   name: user.fname,
    //   attendance: true,
    // });
    // return res.json({
    //   message: "User logged in successfully!",
    //   user,
    //   attendance,
    // });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ sucess: false, message: "Somewhere error in server!" });
  }
};

const getAttendaceData = async (req, res) => {
  const users = await User.find({});
  const attendance = await Attendace.find();

  return res.json({
    sucess: true,
    message: "Data fetched successfully!",
    users,
    attendance,
  });
};

const postAttendanceData = async (req, res) => {
  const { eid, outtime } = req.body;

  console.log(eid, outtime);
  const user = await Attendance.findOneAndUpdate({ eid }, { outtime });
  return res.json({ success: true, message: "Done with updation" });
};

module.exports = { login, getAttendaceData, postAttendanceData };
