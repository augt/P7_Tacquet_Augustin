import React, { useEffect, useState } from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import Publication from "../components/Publication";

function Newsfeed() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = localStorage.getItem("token");

  //create publication
  const uuid = localStorage.getItem("uuid");
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
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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
              user: { username: localStorage.getItem("connectedUsername") },
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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
              user: { username: localStorage.getItem("connectedUsername") },
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
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          setUnfilteredCommentList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getComments();
  }, []);

  //update publication list after deleting publication

  function updateAfterDeletePublication(newPublicationList) {
    setPublicationList(newPublicationList);
  }

  //display comments

  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin} />
      <main>
        <h2>Publications</h2>
        <div className="publication__form">
          <h3>Créez une publication</h3>
          <label htmlFor="publicationText">Texte de la publication</label>
          <textarea
            name="publicationText"
            cols="30"
            rows="6"
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></textarea>
          <label htmlFor="publicationImage">Pièce jointe</label>
          <input
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
