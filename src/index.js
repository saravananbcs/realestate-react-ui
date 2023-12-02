import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Dashboard from "./components/DashboardFinal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Asynchronous from "./components/AutoComplete";
// import FinalDashboard from "./components/FinalDashboard";
import Dashboard from "./components/Dashboard";
// import HomePage from "./components/v2/HomePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Other routes go here */}
      </Routes>
    </Router>
  </React.StrictMode>
);
