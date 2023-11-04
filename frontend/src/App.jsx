import { useContext } from "react";
import "./App.css";
import { Context } from "./context/ContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Login } from "./components";
import { AdminDashboard, Login, PageNotFound, UserDashboard } from "./pages";

const App = () => {
  return (
    <main className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
