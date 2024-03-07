import React, { useEffect } from "react";
import { useState } from "react";
import "./Cards.css";

const Cards = () => {
  const [rat, setRat] = useState([]);
  const [inputdata, setInputdata] = useState("");
  const [username, setUsername] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false)

  useEffect(() => {
    if(searchInitiated && username){
      const fetchdata = async () => {
        try {
          const res = await fetch(`https://api.github.com/users/${username}`);
          if (!res.ok) {
            setRat(null)
            throw new Error(res.status);
          }
          const data = await res.json();
          setRat(data);
        } 
        catch (err) {
          console.log(`This is an error: ${err}`);
        }
      };
      fetchdata();
    }
  }, [searchInitiated, username]);

  const handleInputChange = (data) => {
    setInputdata(data.target.value);
  };

  const handleSearchClick = () => {
    setUsername(inputdata);
    setSearchInitiated(true)
    setInputdata("")
  };
  console.log(inputdata)

  return (
    <div className="card-container">
      <div className="search-bar">
        <input
          type="text"
          onChange={handleInputChange}
          value={inputdata}
          placeholder="Enter Your Name :"
        />
        <button className="search-btn" onClick={handleSearchClick}>
          <i class="fa fa-search"></i>
        </button>
      </div> 

      <div className="cards">
        <div className="cover-photo">
          <img src={rat.avatar_url} className="profile" />
        </div>
        <h3 className="profile-name">{rat.name}</h3>
        <p className="about">{rat.bio}</p>
        <button className="btn"> Followers {rat.followers}</button>
        <button className="btn">Following {rat.following}</button>
        <div className="icons">
          <i className="fa-brands fa-linkedin" />
          <i className="fa-brands fa-github" />
          <i className="fa-brands fa-youtube" />
          <i className="fa-brands fa-twitter" />
        </div>
      </div>
    </div>
  );
};

export default Cards;
