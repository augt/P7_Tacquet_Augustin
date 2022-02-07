import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Account from "../components/Account"
import { ConnectedUserContext } from "../components/Context";


function MyAccount() {
  const { connectedUser} = useContext(ConnectedUserContext);

  return (
    <div>
      <Navbar />
      <main>
        <h2>Mon compte</h2>
        <Account mustLogOut={true} user={connectedUser}/>
      </main>
    </div>
  );
}

export default MyAccount;
