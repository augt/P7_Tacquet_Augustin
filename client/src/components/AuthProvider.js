import React,{ useState, useEffect } from "react";
import App from "../App"
import Axios from "axios"
import { ConnectedUserContext } from "./Context";

function AuthProvider() {
    const token = localStorage.getItem("token");
    const uuid = localStorage.getItem("uuid");
    const [connectedUser, setConnectedUser] = useState({});
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
      const getUser = () => {
        Axios({
          method: "get",
          url: `http://localhost:3001/api/auth/${uuid}`,
          headers: { Authorization: "Bearer " + token },
        })
          .then((res) => {
            setConnectedUser(res.data.user);
            setIsConnected(res.data.isConnected);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getUser();
    }, [token, uuid]);



  return (
    <ConnectedUserContext.Provider value={{ connectedUser, setConnectedUser, isConnected, setIsConnected, token }}>
      <App/>
    </ConnectedUserContext.Provider>
  );
}

export default AuthProvider;
