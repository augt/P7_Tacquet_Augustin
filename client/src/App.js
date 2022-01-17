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
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // login

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/api/auth/login", {
      email: loginEmail,
      password: loginPassword,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        console.log(localStorage.getItem('userId'));
        console.log(res.data.token);
        setUserId(localStorage.getItem("userId"));
        setNewUserId(localStorage.getItem("userId"));
      })
      .catch((res) => {
        console.log(res);
      });
  };

  //create publication
  const [userId, setUserId] = useState();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  
  
  const addPublication = () => {
    
    if (image === "" || image===undefined) {
      Axios({
        method: "post",
        url: "http://localhost:3001/api/publications",
        data: {userId : parseInt(userId), text : text},
        headers: {  "Authorization": "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      const fd = new FormData();
      fd.append("image", image, image.name);
      fd.append("userId", parseInt(userId));
      fd.append("text", text);

      Axios({
        method: "post",
        url: "http://localhost:3001/api/publications",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  //modify publication
  const [newUserId, setNewUserId] = useState();
  const [newText, setNewText] = useState("");
  const [newImage, setNewImage] = useState("");

  const modifyPublication = () => {
    
    if (newImage === "" || newImage === undefined) {
      Axios({
        method: "put",
        url: "http://localhost:3001/api/publications/1",
        data: { userId: parseInt(newUserId), text: newText },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      const fd = new FormData();
      fd.append("image", newImage, newImage.name);
      fd.append("userId", parseInt(newUserId));
      fd.append("text", newText);

      Axios({
        method: "put",
        url: "http://localhost:3001/api/publications/1",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
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

      <h2>Connexion</h2>
      <div className="login_form">
        <label>Email</label>
        <input
          type="text"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}>Connexion</button>
      </div>

      <h2>Publication</h2>
      <div className="publication_form">
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
            console.log(event.target.files[0]);
          }}
        />
        <button onClick={addPublication}>Poster la publication</button>
      </div>
      <h2> Modifier publication</h2>
      <div className="modify_publication_form">
        <label>Nouveau texte de la publication</label>
        <input
          type="text"
          onChange={(event) => {
            setNewText(event.target.value);
          }}
        />
        <label>Nouvelle pièce jointe</label>
        <input
          type="file"
          onChange={(event) => {
            setNewImage(event.target.files[0]);
            console.log(event.target.files[0]);
          }}
        />
        <button onClick={modifyPublication}>Modifier la publication</button>
      </div>
    </div>
  );
}

export default App;
