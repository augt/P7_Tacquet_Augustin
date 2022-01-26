import React , {useState/*,useEffect*/}  from 'react';
import Axios from 'axios'

function Publications() {
  //create publication
  const [uuid] = useState(localStorage.getItem("uuid"));
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

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
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };
  return (
    <main>
      <h2>Publications</h2>
      <div className="publication__form">
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
    </main>
  );
}

export default Publications;
