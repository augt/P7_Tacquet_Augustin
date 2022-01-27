import React, { useState } from "react";

function Publication(props) {
  const [uuid] = useState(localStorage.getItem("uuid"));

  const [show, setShow] = useState(false);
  return (
    <div className="publication">
      <div>
        <p>De :{props.publication.user.username}</p>
        <p>Texte: {props.publication.text}</p>
        <p>image: {props.publication.image}</p>
        <p>Publié le: {props.publication.createdAt}</p>
        <p>Modifié le:{props.publication.updatedAt}</p>
      </div>
      <div>
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          Modifier la publication
        </button>
        {show && (
          <div>
            <label htmlFor="newPublicationText">Nouveau texte</label>
            <br />
            <textarea
              name="newPublicationText"
              cols="30"
              rows="6"
              defaultValue={props.publication.text}
              onChange={(event) => {
                // setNewText(event.target.value);
              }}
            ></textarea>
            <br />
            <label htmlFor="newPublicationImage">pièce jointe</label>
            <br />
            <input
              name="newPublicationImage"
              type="file"
              onChange={(event) => {
                // setNewImage(event.target.files[0]);
                console.log(event.target.files[0]);
              }}
            />
            <button
            /* onClick={() => {
                      updateEmployeeWage(val.id);
                    }} */
            >
              Appliquer les changements
            </button>
          </div>
        )}
        <button
        /* onClick={() => {
                      deleteEmployee(val.id);
                    }} */
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default Publication;
