import "./App.css";
import React, { useContext } from "react";
// react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Newsfeed from "./pages/NewsFeed";
import MyAccount from "./pages/MyAccount";
import Administration from "./pages/Administration";
import Error from "./pages/ErrorPage";

//context

import { ConnectedUserContext } from "./components/Context";

function App() {
  const { connectedUser, isConnected } = useContext(ConnectedUserContext);
  

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isConnected && <Route path="/home" element={<Newsfeed />} />}
        {isConnected && <Route path="/myaccount" element={<MyAccount />} />}
        {isConnected && connectedUser.isAdmin && (
          <Route path="/administration" element={<Administration />} />
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );

}

export default App;
