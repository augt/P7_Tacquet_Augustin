import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  console.log(localStorage.getItem("token"));

  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin"))
  );

  function disconnect() {
    localStorage.clear();
    setIsAdmin(false);
  }

  console.log(isAdmin);

  return (
    <header>
      <img src="../img/icon-left-font-monochrome-black.svg" alt="" />
      <nav>
        <ul id="navigation__list">
          <li>
            <Link to="/">Connexion</Link>
          </li>
          <li>
            <Link to="/signup">Inscription</Link>
          </li>
          <li>
            <Link to="/publications">Publications</Link>
          </li>
          <li>
            <Link to="/account">Mon compte</Link>
          </li>
          <li onClick={disconnect}>
            <Link to="/">Déconnexion</Link>
          </li>
          {isAdmin === true && (
            <li>
              <Link to="/administration">Administration</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
