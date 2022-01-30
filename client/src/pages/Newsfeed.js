import React, { useEffect, useState } from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import Publication from "../components/Publication";

function Newsfeed() {
  const [isAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  const [token] = useState(localStorage.getItem("token"));

  //create publication
  const [uuid] = useState(localStorage.getItem("uuid"));
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const [publicationList, setPublicationList] = useState([]);

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

  // display publications
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
  }, []);

  //getPublications()

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
            onChange={(event) => {
              setImage(event.target.files[0]);
              console.log(event.target.files[0]);
            }}
          />
          <button onClick={addPublication}>Poster la publication</button>
        </div>
        {/* display newsfeed */}
        <h3>Dernières publications</h3>
        {/* <button onClick={getPublications}>récupérer publications</button> */}

        <div className="publication__list">
          {publicationList.map((publication) => {
            return (
              <Publication publication={publication} key={publication.id} />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Newsfeed;
