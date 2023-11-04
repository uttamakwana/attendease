import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import "./admin-dashboard.css";
import { BiSolidDashboard } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";

const AdminDashboard = () => {
  // User data
  const [employeeData, setEmployeeData] = useState([
    { id: 1, name: "John Doe", inTime: "09:00 AM", outTime: "05:00 PM" },
    { id: 2, name: "Jane Smith", inTime: "08:30 AM", outTime: "04:30 PM" },
    { id: 3, name: "Bob Johnson", inTime: "09:15 AM", outTime: "05:30 PM" },
    // Add more employee data here
  ]);
  const { timeStamp, setTimeStamp, inTime, outTime, setInTime, setOutTime } =
    useContext(Context);

  const [currentTime, setCurrentTime] = useState(new Date());
  // const [users, setUsers] = useState([employeeData]);
  // const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    // Update the time every second
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // attendance data
    const fetchData = async () => {
      const response = await axios.post("http://localhost:5500/api/user/data");

      // console.log(response.data.users);

      // const users = response.data.users;
      const attendance = response.data.attendance;
      setEmployeeData(attendance);
      // console.log(users, attendance);
    };

    fetchData();

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

  const changeTimeFormat = (time) => {
    // const inputDateString = "2023-11-04T09:38:53.287+00:00";
    const date = new Date(time);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedTime = `${hours % 12 || 12}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")} ${ampm}`;

    // console.log(formattedTime);
    return formattedTime;
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
          <BiLogOut className="logout-icon icon" />
        </ul>
      </aside>
      <nav className="user-navbar navbar br-5">
        <h1 className="user-navbar-heading">Dashboard</h1>
        <div className="user-navbar-profile">
          <div className="user-navbar-profile-logo"></div>
          <p className="user-navbar-profile-names">
            <h3>Name</h3>
            <h5>name@gmail.com</h5>
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
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Employee Name</th>
                <th>In Time</th>
                <th>Out Time</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr key={employee.eid}>
                  <td>{employee.eid}</td>
                  <td>{employee.name}</td>
                  <td className="admin-content-intime">
                    {changeTimeFormat(employee.intime) || "3:00PM"}
                  </td>
                  <td className="admin-content-outtime">
                    {employee.outtime
                      ? changeTimeFormat(employee.outtime)
                      : "null"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </main>
  );
};

export default AdminDashboard;
