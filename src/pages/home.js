import React, { useState } from "react";
import "../css/Home.css";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Home() {
  // backend for incrementing the count variable
  let [count, setCount] = useState(3);
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  var api_url = "http://jasyi.pythonanywhere.com/authcode";

  function incrementVal() {
    count = count + 1;
    setCount(count);
  }

  function decrementVal() {
    count = count - 1;
    if (count <= 2) {
      count = 2;
    }
    setCount(count);
  }

  // handling change of form elements
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlaylistUrl(value);
  };

  // handling change of checkbox
  const handleClick = () => setChecked(!checked);

  async function submitToAPI() {
    const data = { playlist: playlistUrl, num: count, ideal: checked };
    const searchParams = new URLSearchParams(data);
    alert("going to url: " + api_url + "?" + searchParams.toString());
    console.log("going to url: " + api_url + "?" + searchParams.toString());
    window.location.href = api_url + "?" + searchParams.toString();

    // window.location.href =
    //   api_url +
    //   createSearchParams({
    //     playlist: playlistUrl,
    //     num: count,
    //     ideal: checked,
    //   }).toString();

    // call the api endpoint here, have to set up in flask first
  }

  return (
    <div>
      <h1 className="title">Splitify</h1>
      <h3 className="subtitle">
        Just a fun project to split your egregiously large playlists :)
      </h3>
      <div className="form">
        <form onSubmit={submitToAPI}>
          <input
            type="text"
            className="text-input"
            placeholder="Paste URL..."
            value={playlistUrl}
            onChange={handleChange}
          />
          <div className="num-select">
            <label className="num-label">Number of Playlists</label>
            <input
              type="text"
              className="num-input"
              value={count}
              readOnly="true"
            />
            <button
              className="inc-button minus"
              onClick={decrementVal}
              type="button"
            >
              -
            </button>
            <button
              className="inc-button plus"
              onClick={incrementVal}
              type="button"
            >
              +
            </button>
          </div>
          <div className="reccomended-checkbox">
            <input
              type="checkbox"
              className="rec-num"
              value={checked}
              onClick={handleClick}
            />
            <label>Find the reccomended number of playlists!</label>
          </div>
          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
