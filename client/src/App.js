import "./App.css";
import React from "react";
// react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Newsfeed from "./pages/Newsfeed";
import Account from "./pages/Account";
import Administration from "./pages/Administration";
import Error from "./pages/ErrorPage";

// navbar

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/account" element={<Account />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
