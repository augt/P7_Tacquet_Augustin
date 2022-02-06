import "./App.css";
import React from "react";
// react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Newsfeed from "./pages/NewsFeed";
import MyAccount from "./pages/MyAccount";
import Administration from "./pages/Administration";
import Error from "./pages/ErrorPage";

// navbar

function App() {
  const token = localStorage.getItem("token");
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {token && <Route path="/newsfeed" element={<Newsfeed />} />}
        {token && <Route path="/myaccount" element={<MyAccount />} />}
        {token && isAdmin && (
          <Route path="/administration" element={<Administration />} />
        )}

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
