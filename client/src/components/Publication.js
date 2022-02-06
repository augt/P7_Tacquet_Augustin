import React, { useState } from "react";
import Axios from "axios";
import dayjs from "dayjs";
import Comments from "./Comments";
require("dayjs/locale/fr");
function Publication(props) {
  const token =localStorage.getItem("token")
  const [show, setShow] = useState(false);
  const id = props.publication.id;
  const username = props.publication.user.username;
  const [image, setImage] = useState(props.publication.image);
  const [text, setText] = useState(props.publication.text);

  const createdAt = props.publication.createdAt;
  const convertedCreatedAt = dayjs(`${props.publication.createdAt}`)
      .locale("fr")
      .format("DD MMMM YYYY à HH:mm");

  const [updatedAt, setUpdatedAt] = useState(props.publication.updatedAt);
  const [convertedUpdatedAt, setConvertedUpdatedAt] = useState(
    dayjs(`${props.publication.updatedAt}`)
      .locale("fr")
      .format("DD MMMM YYYY à HH:mm")
  );
  
  const publicationList = props.publicationList;

  //modify publication
  const newUuid = localStorage.getItem("uuid");
  const [newText, setNewText] = useState(text);
  const [newImage, setNewImage] = useState(undefined);

  const newSelectedFile = document.getElementById("newSelected__file");

  function removeAttachment() {
    newSelectedFile.value = "";
    setNewImage(undefined);
  }

  const modifyPublication = () => {
    if (newImage === "" || newImage === undefined || newImage === null) {
      Axios({
        method: "put",
        url: `http://localhost:3001/api/publications/${id}`,
        data: { uuid: newUuid, text: newText, image: newImage },
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          console.log(res);
          setImage(res.data.image);
          setText(res.data.text);
          setUpdatedAt(res.data.updatedAt);
          setConvertedUpdatedAt(
            dayjs(`${res.data.updatedAt}`)
              .locale("fr")
              .format("DD MMMM YYYY à HH:mm")
          );
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
          Authorization: "Bearer " + token,
        },
      })
        .then(function (res) {
          console.log(res);
          setImage(res.data.image);
          setText(res.data.text);
          setUpdatedAt(res.data.updatedAt);
          setConvertedUpdatedAt(
            dayjs(`${res.data.updatedAt}`)
              .locale("fr")
              .format("DD MMMM YYYY à HH:mm")
          );
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  };

  const deletePublication = () => {
    const publicationIndex = publicationList.findIndex(
      (publication) => publication.id === id
    );

    Axios({
      method: "delete",
      url: `http://localhost:3001/api/publications/${id}`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
        publicationList.splice(publicationIndex, 1);
        const newPublicationList = [...publicationList];
        props.updateAfterDelete(newPublicationList);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="publication">
      <div>
        <p className="username">{username} :</p>
        <p>{text}</p>
        {image && (
          <img
            src={image}
            alt="illustration attachée à la publication"
          />
        )}
        <p className="date">Publiée : {convertedCreatedAt}</p>
        {createdAt !== updatedAt && (
          <p className="date">Modifiée : {convertedUpdatedAt}</p>
        )}
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
              cols="100"
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
              id="newSelected__file"
              onChange={(event) => {
                setNewImage(event.target.files[0]);
                console.log(event.target.files[0]);
              }}
            />
            {newImage !== null && image && (
              <button
                onClick={() => {
                  setNewImage(null);
                }}
              >
                Supprimer l'image existante
              </button>
            )}
            {newImage === null && image && (
              <button
                onClick={() => {
                  setNewImage(undefined);
                }}
              >
                Restaurer l'image existante
              </button>
            )}
            {newImage !== undefined && newImage !== null && (
              <button onClick={removeAttachment}>Annuler nouvelle image</button>
            )}
            <button
              onClick={() => {
                modifyPublication();
                setShow(!show);
                setNewImage(undefined);
              }}
            >
              Appliquer les changements
            </button>
          </div>
        )}
        {props.publication.uuid === localStorage.getItem("uuid") &&
          localStorage.getItem("isAdmin") === "false" && (
            <button
              onClick={() => {
                deletePublication();
              }}
            >
              Supprimer la publication
            </button>
          )}
        {localStorage.getItem("isAdmin") === "true" && (
          <button
            onClick={() => {
              deletePublication();
            }}
          >
            Supprimer la publication
          </button>
        )}
      </div>
      <Comments
        publicationId={id}
        unfilteredCommentList={props.unfilteredCommentList}
      />
    </div>
  );
}

export default Publication;
