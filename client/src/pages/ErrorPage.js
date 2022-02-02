import React from 'react';
import Navbar from "../components/Navbar";

function ErrorPage() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = localStorage.getItem("token");
  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin}/>
      <main>Erreur</main>
    </div>
  );
}

export default ErrorPage;
