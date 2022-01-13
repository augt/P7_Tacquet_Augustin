import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  //create user profile
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = () => {
    Axios.post("http://localhost:3001/api/auth/signup", {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      console.log("success");
    });
  };

  const [authorId, setAuthorId] = useState();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

    //create publication
  const addPublication = () => {

    const fd = new FormData();
    fd.append('image', image, image.name);
    fd.append('authorId', authorId);
    fd.append('text', text);
    
    Axios({
      method: "post",
      url: "http://localhost:3001/api/publications",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  //modify publication
  const [newAuthorId, setNewAuthorId] = useState();
  const [newText, setNewText] = useState("");
  const [newImage, setNewImage] = useState("");

  const modifyPublication = () => {
    const fd = new FormData();
    fd.append("image", newImage, newImage.name);
    fd.append("authorId", newAuthorId);
    fd.append("text", newText);

    Axios({
      method: "put",
      url: "http://localhost:3001/api/publications/1",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
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
      <h2>Publication</h2>
      <div className="publication_form">
        <label>identifiant utilisateur:</label>
        <input
          type="number"
          onChange={(event) => {
            setAuthorId(event.target.value);
          }}
        />
        <label>texte de la publication</label>
        <input
          type="text"
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <label>pièce jointe</label>
        <input
          type="file"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
        <button onClick={addPublication}>Poster la publication</button>
      </div>
      <h2> Modifier publication</h2>
      <div className="modify_publication_form">
        <label>identifiant utilisateur:</label>
        <input
          type="number"
          onChange={(event) => {
            setNewAuthorId(event.target.value);
          }}
        />
        <label>texte de la publication</label>
        <input
          type="text"
          onChange={(event) => {
            setNewText(event.target.value);
          }}
        />
        <label>pièce jointe</label>
        <input
          type="file"
          onChange={(event) => {
            setNewImage(event.target.files[0]);
          }}
        />
        <button onClick={modifyPublication}>Poster la publication</button>
      </div>
    </div>
  );
}

export default App;
