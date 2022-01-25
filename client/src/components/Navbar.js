import React from 'react';
import { Link } from "react-router-dom";


function Navbar() {

  return (
    <header>
      <img src="../img/icon-left-font-monochrome-black.svg" alt="" />
      <nav>
        <ul>
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
          <li><button>Déconnexion</button></li>
          <li>
            <Link to="/administration">Administration</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
