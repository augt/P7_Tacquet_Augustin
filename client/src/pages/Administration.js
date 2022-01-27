import React, {useState} from 'react';
import Navbar from "../components/Navbar";


function Administration() {
  const [isAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  const [token] = useState(localStorage.getItem("token"));
  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin} />
      <main>Administration</main>
    </div>
  );
}

export default Administration;
