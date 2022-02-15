import React, { useContext } from "react";
import Header from "../components/Header";
import Account from "../components/Account"
import { ConnectedUserContext } from "../components/Context";


function MyAccount() {
  const { connectedUser} = useContext(ConnectedUserContext);

  return (
    <div>
      <Header />
      <main>
        <h2>Mon compte</h2>
        <Account mustLogOut={true} user={connectedUser}/>
      </main>
    </div>
  );
}

export default MyAccount;
