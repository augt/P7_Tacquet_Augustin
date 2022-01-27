import React from 'react';

function Publication(props) {
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
        {" "}
        <input
          type="text"
          placeholder="2000..."
          /* onChange={(event) => {
                      setNewWage(event.target.value);
                    }} */
        />
        <button
        /* onClick={() => {
                      updateEmployeeWage(val.id);
                    }} */
        >
          Update
        </button>
        <button
        /* onClick={() => {
                      deleteEmployee(val.id);
                    }} */
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Publication;
