import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addUser = () => {
    Axios.post("http://localhost:3001/api/auth/signup", {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div className="App">
      <h1>Groupomania</h1>
      <h2>Inscription</h2>
      <div className="register_form">
        <label>Nom d'utilisateur:</label>
        <input
          type="text"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={addUser}>Créer utilisateur</button>
      </div>
    </div>
  );
}

export default App;
