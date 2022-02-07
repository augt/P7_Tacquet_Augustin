import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { ConnectedUserContext } from "../components/Context";

function Navbar() {
  const {connectedUser, isConnected, setIsConnected} = useContext(ConnectedUserContext);

  function disconnect() {
    localStorage.clear();
    setIsConnected(false)
  }

  return (
    <header>
      <img src="../img/logo.png" alt="" />
      <nav>
        <ul id="navigation__list">
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
              <Link to="/newsfeed">Fil d'actualité</Link>
            </li>
          )}
          {isConnected===true && (
            <li>
              <Link to="/myaccount">{connectedUser.username}</Link>
            </li>
          )}
          {connectedUser.isAdmin === true && (
            <li>
              <Link to="/administration">Administration</Link>
            </li>
          )}
          {isConnected===true && (
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
