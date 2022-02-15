import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { ConnectedUserContext } from "./Context";

function Header() {
  const {connectedUser, isConnected, setIsConnected} = useContext(ConnectedUserContext);

  function disconnect() { 
    localStorage.clear();
    setIsConnected(false);
    window.location.href = "/";
  }

  return (
    <header>
      <img src="../img/logo.png" alt="Logo de Groupomania" />
      <nav>
        <ul className="navigation__list">
          {isConnected===false && (
            <li>
              <Link to="/">Connexion</Link>
            </li>
          )}
          {isConnected===false && (
            <li>
              <Link to="/signup">Inscription</Link>
            </li>
          )}
          {isConnected===true && (
            <li>
              <Link to="/home">Accueil</Link>
            </li>
          )}
          {isConnected===true && (
            <li>
              <Link to="/myaccount">{connectedUser.username}</Link>
            </li>
          )}
          {connectedUser.isAdmin === true && isConnected===true && (
            <li>
              <Link to="/administration">Administration</Link>
            </li>
          )}
          {isConnected===true && (
            <li onClick={disconnect} className="btn">
              Déconnexion
            </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
