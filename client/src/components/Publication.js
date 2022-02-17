import React, { useState, useContext } from "react";
import Axios from "axios";
import dayjs from "dayjs";
import Comments from "./Comments";
import { ConnectedUserContext } from "./Context";
require("dayjs/locale/fr");

function Publication(props) {
  const { connectedUser, token } = useContext(ConnectedUserContext);
  const [show, setShow] = useState(false);
  const { id } = props.publication;
  const { username } = props.publication.user;
  const [image, setImage] = useState(props.publication.image);
  const [text, setText] = useState(props.publication.text);

  const { createdAt } = props.publication;
  const convertedCreatedAt = dayjs(`${createdAt}`)
    .locale("fr")
    .format("DD MMMM YYYY à HH:mm");

  const [{ updatedAt }, setUpdatedAt] = useState(props.publication);
  const [convertedUpdatedAt, setConvertedUpdatedAt] = useState(
    dayjs(`${props.publication.updatedAt}`)
      .locale("fr")
      .format("DD MMMM YYYY à HH:mm")
  );

  const { publicationList } = props;

  //modify publication
  const newUuid = connectedUser.uuid;
  const [newText, setNewText] = useState(text);
  const [newImage, setNewImage] = useState(undefined);
  const [fileErrorMessage, setFileErrorMessage] = useState("");

  const newSelectedFile = document.getElementById("newSelected__file");

  function removeAttachment() {
    newSelectedFile.value = "";
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
          setImage(res.data.image);
          setText(res.data.text);
          setUpdatedAt(res.data.updatedAt);
          setConvertedUpdatedAt(
            dayjs(`${res.data.updatedAt}`)
              .locale("fr")
              .format("DD MMMM YYYY à HH:mm")
          );
          setFileErrorMessage("");
          setShow(!show);
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
          setImage(res.data.image);
          setText(res.data.text);
          setUpdatedAt(res.data.updatedAt);
          setConvertedUpdatedAt(
            dayjs(`${res.data.updatedAt}`)
              .locale("fr")
              .format("DD MMMM YYYY à HH:mm")
          );
          setFileErrorMessage("");
          setShow(!show);
          setNewImage(undefined);
        })
        .catch(function (err) {
          if (err.response.status === 500) {
            setFileErrorMessage(
              "Seuls les fichiers d'une taille inférieure à 10Mo avec une extension de type .png, .jpg, .jpeg et .gif sont autorisés."
            );
          }

          console.log(err);
        });
    }
  };

  const deletePublication = () => {
    const publicationIndex = publicationList.findIndex(
      (publication) => publication.id === id
    );

    if (window.confirm("Confirmez-vous la suppression de cet élément ?")) {
      Axios({
        method: "delete",
        url: `http://localhost:3001/api/publications/${id}`,
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          publicationList.splice(publicationIndex, 1);
          const newPublicationList = [...publicationList];
          props.updateAfterDelete(newPublicationList);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="publication">
      <div>
        <p className="username">{username}</p>
        <p className="text">{text}</p>
        <div className="image__container">
          {image && (
            <img src={image} alt="illustration attachée à la publication" />
          )}
        </div>
        <p className="date">Publiée : {convertedCreatedAt}</p>
        {createdAt !== updatedAt && (
          <p className="date">Modifiée : {convertedUpdatedAt}</p>
        )}
      </div>
      <div>
        {props.publication.uuid === connectedUser.uuid &&
          connectedUser.isAdmin === false && (
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              Modifier
            </button>
          )}
        {connectedUser.isAdmin === true && (
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            Modifier
          </button>
        )}
        {props.publication.uuid === connectedUser.uuid &&
          connectedUser.isAdmin === false && (
            <button
              onClick={() => {
                deletePublication();
              }}
            >
              Supprimer
            </button>
          )}
        {connectedUser.isAdmin === true && (
          <button
            onClick={() => {
              deletePublication();
            }}
          >
            Supprimer
          </button>
        )}
        {show && (
          <div>
            <label htmlFor="newPublicationText">Nouveau texte</label>
            <div className="textarea__container">
              <textarea
                name="newPublicationText"
                rows="6"
                id="newPublicationText"
                className="widen__textarea"
                defaultValue={text}
                onChange={(event) => {
                  setNewText(event.target.value);
                }}
              ></textarea>
            </div>
            <label htmlFor="newSelected__file">Nouvelle pièce jointe</label>
            <br />
            <input
              className="input__file"
              name="newPublicationImage"
              type="file"
              id="newSelected__file"
              onChange={(event) => {
                setNewImage(event.target.files[0]);
              }}
            />
            {newImage !== undefined && newImage !== null && (
              <button
                onClick={() => {
                  removeAttachment();
                  setNewImage(undefined);
                }}
              >
                Annuler nouvelle image
              </button>
            )}
            {newImage === null && image && (
              <button
                onClick={() => {
                  setNewImage(undefined);
                  removeAttachment();
                }}
              >
                Restaurer l'image existante
              </button>
            )}
            {newImage !== null && image && (
              <button
                onClick={() => {
                  setNewImage(null);
                  if (newSelectedFile !== null) {
                    removeAttachment();
                  }
                }}
              >
                Supprimer l'image existante
              </button>
            )}
            <br />
            <button
              onClick={() => {
                modifyPublication();
              }}
            >
              Appliquer les changements
            </button>
            <div>{fileErrorMessage}</div>
          </div>
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
