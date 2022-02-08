import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import Publication from "../components/Publication";
import { ConnectedUserContext} from "../components/Context"
require("dayjs/locale/fr");

function Newsfeed() {

  const {connectedUser, token} = useContext(ConnectedUserContext)

  //create publication
  const {uuid} = connectedUser
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const [publicationList, setPublicationList] = useState([]);
  const [unfilteredCommentList, setUnfilteredCommentList] = useState([])

  const selectedFile = document.getElementById("selected__file");

  function removeAttachment() {
    selectedFile.value = "";
    setImage("");
  }

  const addPublication = () => {
    if (image === "" || image === undefined) {
      Axios({
        method: "post",
        url: "http://localhost:3001/api/publications",
        data: { uuid: uuid, text: text },
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          console.log(res);
          setPublicationList([
            {
              id: res.data.id,
              uuid: uuid,
              text: text,
              image: res.data.image,
              createdAt: res.data.createdAt,
              updatedAt: res.data.updatedAt,
              user: { username: connectedUser.username },
            },
            ...publicationList,
          ]);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      const fd = new FormData();
      fd.append("image", image, image.name);
      fd.append("uuid", uuid);
      fd.append("text", text);

      Axios({
        method: "post",
        url: "http://localhost:3001/api/publications",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
        .then(function (res) {
          console.log(res);
          setPublicationList([
            {
              id: res.data.id,
              uuid: uuid,
              text: text,
              image: res.data.image,
              createdAt: res.data.createdAt,
              updatedAt: res.data.updatedAt,
              user: { username: connectedUser.username },
            },
            ...publicationList,
          ]);
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  };

  // fetch publications and comments
  useEffect(() => {
    const getPublications = () => {
      Axios({
        method: "get",
        url: "http://localhost:3001/api/publications",
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          setPublicationList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getPublications();

    const getComments = () => {
      Axios({
        method: "get",
        url: "http://localhost:3001/api/comments",
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          setUnfilteredCommentList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getComments();
  }, [token]);

  //update publication list after deleting publication

  function updateAfterDeletePublication(newPublicationList) {
    setPublicationList(newPublicationList);
  }

  //display comments

  return (
    <div>
      <Navbar />
      <main>
        <h2>Publications</h2>
        <div className="publication__form">
          <h3>Créez une publication</h3>
          <label htmlFor="publicationText">Texte de la publication</label>
          <textarea
            name="publicationText"
            rows="6"
            id="publicationText"
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></textarea>
          <label htmlFor="selected__file">Pièce jointe</label>
          <input
          className="input__file"
            name="publicationImage"
            type="file"
            id="selected__file"
            onChange={(event) => {
              setImage(event.target.files[0]);
              console.log(event.target.files[0]);
            }}
          />
          
          {image !== "" && image !==undefined && (
            <button onClick={removeAttachment}>
              Supprimer la pièce jointe
            </button>
          )}
          <button onClick={addPublication}>Poster la publication</button>
        </div>
        {/* display newsfeed */}
        <h3>Dernières publications</h3>

        <div className="publication__list">
          {publicationList.map((publication) => {
            return (
              <Publication
                publication={publication}
                key={publication.id}
                publicationList={publicationList}
                updateAfterDelete={updateAfterDeletePublication}
                unfilteredCommentList={unfilteredCommentList}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Newsfeed;
