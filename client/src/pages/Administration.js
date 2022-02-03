import React, {useState, useEffect} from 'react';
import Navbar from "../components/Navbar";
import Account from '../components/Account';
import Axios from "axios";


function Administration() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = localStorage.getItem("token");
  const [userList, setUserList] = useState([]);

  //fetch user's data

  useEffect(() => {
    const getUsers = () => {
      Axios({
        method: "get",
        url: `http://localhost:3001/api/auth/`,
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          console.log(res);
          setUserList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsers();
  }, [token]);

  //update comment list after deleting comment

  function updateAfterDeleteUser(newUserList) {
    setUserList(newUserList);
  }

  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin} />
      <main>
        <h2>Comptes utilisateurs</h2>
        <div>
          {userList.map((user) => {
            return (
              <Account
                user={user}
                key={user.uuid}
                userList={userList}
                updateAfterDelete={updateAfterDeleteUser}
                mustUpdateList={true}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Administration;
