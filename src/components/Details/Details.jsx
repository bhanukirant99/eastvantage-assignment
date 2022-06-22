import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import "./Details.css";


const Details = () => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  
  useEffect(() => {
    getUserFromAPI();
    setTimeout(getUserFromLocalStorage(), 500);
  });

  // Get user from ramdomuser.com
  const getUserFromAPI = async () => {
    try {
      const response = await axios.get(BASE_URL);

      const responseUser = response.data.results[0];

      // Setting Local Storage values
      localStorage.setItem("userEmail", responseUser.email);
      localStorage.setItem("userName", responseUser.name["title"] + " " + responseUser.name["first"] + " " + responseUser.name["last"]);
      console.log(responseUser);
    } catch (error) {
      console.error(error);
    }
  }

  const getUserFromLocalStorage = () => {
    // Retriving values from  Local Storage

    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    setUserEmail(userEmail)
    setUserName(userName)  
  }


  const refresh = () => {
    // re-renders the component
    getUserFromLocalStorage();
  };

  return (
    <div className="App">
      <h2>Hi There, This is an app to fetch random users after every 2 seconds</h2>
      <h2>Click on the Refresh button to get a new user</h2>  
      <div>
        <button id="refresh__button" onClick={refresh}>Refresh</button>
      </div>

      <div className="user">
        <label id="user__name">Name: {userName}</label>
        <label id="user__email">Email: {userEmail}</label>
      </div>
    </div>
  );
}

export default Details;