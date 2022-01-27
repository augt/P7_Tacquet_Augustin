import React, {useState} from 'react';
import Navbar from "../components/Navbar";

function Account() {
  const [isAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  const [token] = useState(localStorage.getItem("token"));
  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin} />
      <main>Mon compte</main>
    </div>
  );
}

export default Account;
