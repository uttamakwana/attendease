const express = require("express");
const {
  login,
  getAttendaceData,
  postAttendanceData,
} = require("../controller/userController.js");

const router = express.Router();

router.post("/login", login);
router.post("/data", getAttendaceData);
router.post("/out", postAttendanceData);

module.exports = router;
