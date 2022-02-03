import React from 'react';
import Navbar from "../components/Navbar";


function Administration() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = localStorage.getItem("token");
  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin} />
      <main>
        <h2>Comptes utilisateurs</h2>
      </main>
    </div>
  );
}

export default Administration;
