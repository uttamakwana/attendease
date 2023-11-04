import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import "./user-dashboard.css";
import { BiSolidDashboard } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const {
    timeStamp,
    setTimeStamp,
    inTime,
    outTime,
    setInTime,
    setOutTime,
    user,
  } = useContext(Context);

  const [currentTime, setCurrentTime] = useState(new Date());

  const hanldeLogOut = async () => {
    const response = await axios.post("http://localhost:5500/api/user/out", {
      eid: user.eid,
      outtime: Date.now(),
    });

    navigate("/");
    console.log(response.data);
  };

  useEffect(() => {
    // Update the time every second
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setInTime(formatTime(currentTime));
    return () => {
      // Clear the interval when the component unmounts
      clearInterval(timerID);
    };
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[date.getDay()];

    // Pad with leading zeros if necessary
    const pad = (value) => (value < 10 ? `0${value}` : value);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm} ${day}`;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <main className="user-dashboard-page">
      <aside className="user-sidebar sidebar br-5 flex-center">
        <ul className="user-sidebar-list ">
          <BiSolidDashboard className="dashboard-icon icon" />
          <GoTasklist className="task-icon icon" />
          <FiSettings className="setting-icon icon" />
          <SlCalender className="calender-icon icon" />
          <BiLogOut className="logout-icon icon" onClick={hanldeLogOut} />
        </ul>
      </aside>
      <nav className="user-navbar navbar br-5">
        <h1 className="user-navbar-heading">Dashboard</h1>
        <div className="user-navbar-profile">
          <div className="user-navbar-profile-logo"></div>
          <p className="user-navbar-profile-names">
            <h3>{user.fname}</h3>
            <h5>{user.email}</h5>
          </p>
        </div>
      </nav>
      <article className="user-content content br-5">
        <div className="user-content-up">
          <div className="user-content-time user-content-card">
            <div className="user-content-current-time">
              <BsSun className="sun-icon" />
              <p>
                {/* {currnetDate.getHours()}: {currnetDate.getMinutes()} :{" "}
                {currnetDate.getSeconds()} */}
                {formatTime(currentTime)}
              </p>
            </div>
            <p>
              <strong>Today:&nbsp;</strong>
              {formatDate(currentTime)}
            </p>
          </div>
          <div className="user-content-attendance user-content-card">
            <h1>
              In-time: <span className="user-in-time">{inTime}</span>
            </h1>
          </div>
          {/* <div className="user-content-total-emp user-content-card"></div> */}
          {/* <div className="user-content-on-time user-content-card"></div>
          <div className="user-content-absent user-content-card"></div>
          <div className="user-content-late user-content-card"></div>
          <div className="user-content-early user-content-card"></div>
          <div className="user-content-time-off user-content-card"></div> */}
        </div>
        <div className="user-content-down">
        </div>
      </article>
    </main>
  );
};

export default UserDashboard;
