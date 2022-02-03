import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import Account from "../components/Account"
require("dayjs/locale/fr");


function MyAccount() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = localStorage.getItem("token");
  const uuid = localStorage.getItem("uuid");
  const [user, setUser] = useState({});

  //fetch user's data

  useEffect(() => {
    const getUser = () => {
      Axios({
        method: "get",
        url: `http://localhost:3001/api/auth/${uuid}`,
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          console.log(res)
          setUser(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUser();
  }, [token, uuid]);

  return (
    <div>
      <Navbar token={token} isAdmin={isAdmin} />
      <main>
        <h2>Mon compte</h2>
        <Account user={user} mustLogOut={true}/>
      </main>
    </div>
  );
}

export default MyAccount;
