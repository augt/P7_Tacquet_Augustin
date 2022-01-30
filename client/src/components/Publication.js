import React, { useState } from "react";
import Axios from "axios";

function Publication(props) {
  const [show, setShow] = useState(false);
  const [id] = useState(props.publication.id);
  const [username] = useState(props.publication.user.username);
  const [image, setImage] = useState(props.publication.image);
  const [text, setText] = useState(props.publication.text);
  const [createdAt] = useState(props.publication.createdAt);
  const [updatedAt, setUpdatedAt] = useState(props.publication.updatedAt);


  //modify publication
  const [newUuid] = useState(localStorage.getItem("uuid"));
  const [newText, setNewText] = useState(text);
  const [newImage, setNewImage] = useState(undefined);

  const modifyPublication = () => {
    if (newImage === "" || newImage === undefined || newImage ===null) {
      Axios({
        method: "put",
        url: `http://localhost:3001/api/publications/${id}`,
        data: { uuid: newUuid, text: newText, image: newImage },
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
      fd.append("uuid", newUuid);
      fd.append("text", newText);

      Axios({
        method: "put",
        url: `http://localhost:3001/api/publications/${id}`,
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
    <div className="publication">
      <div>
        <p>De :{username}</p>
        <p>Texte: {text}</p>
        <p>image: {image}</p>
        <p>Publié le: {createdAt}</p>
        <p>Modifié le:{updatedAt}</p>
      </div>
      <div>
        {props.publication.uuid === localStorage.getItem("uuid") &&
          localStorage.getItem("isAdmin") === "false" && (
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              Modifier
            </button>
          )}
        {localStorage.getItem("isAdmin") === "true" && (
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            Modifier
          </button>
        )}
        {show && (
          <div>
            <label htmlFor="newPublicationText">Nouveau texte</label>
            <br />
            <textarea
              name="newPublicationText"
              cols="30"
              rows="6"
              defaultValue={text}
              onChange={(event) => {
                setNewText(event.target.value);
              }}
            ></textarea>
            <br />
            <label htmlFor="newPublicationImage">Nouvelle pièce jointe</label>
            <br />
            <input
              name="newPublicationImage"
              type="file"
              onChange={(event) => {
                setNewImage(event.target.files[0]);
                console.log(event.target.files[0]);
              }}
            />
            <button
              onClick={() => {
                setNewImage(null);
              }}
            >
              Supprimer l'image
            </button>
            {newImage!==undefined&&newImage!==null&&<button
              onClick={() => {
                setNewImage(undefined);
              }}
            >
              Supprimer nouvelle image
            </button>}
            <button
              onClick={() => {
                modifyPublication();
              }}
            >
              Appliquer les changements
            </button>
          </div>
        )}
        {props.publication.uuid === localStorage.getItem("uuid") &&
          localStorage.getItem("isAdmin") === "false" && (
            <button
            /* onClick={() => {
                      deleteEmployee(val.id);
                    }} */
            >
              Supprimer
            </button>
          )}
        {localStorage.getItem("isAdmin") === "true" && (
          <button
          /* onClick={() => {
                      deleteEmployee(val.id);
                    }} */
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}

export default Publication;
