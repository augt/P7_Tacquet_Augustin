import React, { useContext } from "react";
import Header from "../components/Header";
import { ConnectedUserContext } from "../components/Context";

function ErrorPage() {
  const { isConnected } = useContext(ConnectedUserContext);

  if (isConnected === true) {
    window.location.href = "home";
  }


  return (
    <div>
      <Header />
      <main>
        <h2>Erreur</h2>
        <p>Cette page n'existe pas ou vous n'êtes pas autorisé à y accéder.</p>
        <p>
          Vous devez être connecté pour accéder au
          contenu du site.
        </p>
      </main>
    </div>
  );
}

export default ErrorPage;
