import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  function disconnect() {
    localStorage.clear();
  }

  return (
    <header>
      <img src="../img/icon-left-font-monochrome-black.svg" alt="" />
      <nav>
        <ul id="navigation__list">
          {!props.token && (
            <li>
              <Link to="/">Connexion</Link>
            </li>
          )}
          {!props.token && (
            <li>
              <Link to="/signup">Inscription</Link>
            </li>
          )}
          {props.token && (
            <li>
              <Link to="/newsfeed">Fil d'actualité</Link>
            </li>
          )}
          {props.token && (
            <li>
              <Link to="/account">{localStorage.getItem("connectedUsername")}</Link>
            </li>
          )}
          {props.isAdmin === true && (
            <li>
              <Link to="/administration">Administration</Link>
            </li>
          )}
          {props.token && (
            <li onClick={disconnect}>
              <Link to="/">Déconnexion</Link>
            </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
