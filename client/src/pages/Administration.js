import React, {useState, useEffect, useContext} from 'react';
import Header from "../components/Header";
import Account from '../components/Account';
import Axios from "axios";
import { ConnectedUserContext } from "../components/Context";


function Administration() {
  const { token } = useContext(ConnectedUserContext);
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
      <Header/>
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
