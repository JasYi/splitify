import React, { useState } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // backend for incrementing the count variable
  let [count, setCount] = useState(3);

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

  // OAuth for Spotify
  var client_id = "CLIENT_ID";
  var redirect_uri = "http://localhost:3000/callback";
  const navigate = useNavigate();

  function auth() {
    var state = Math.random().toString(36).substring(16);
    var scope = "user-read-private user-read-email";

    let url = new URL("https://accounts.spotify.com/authorize?");
    let params = new URLSearchParams(url.search);
    params.append("response_type", "code");
    params.append("client_id", client_id);
    params.append("scope", scope);
    params.append("redirect_uri", redirect_uri);
    params.append("state", state);

    navigate(url);
  }

  return (
    <div>
      <h1 className="title">Splitify</h1>
      <div className="form">
        <form>
          <input
            type="text"
            className="text-input"
            placeholder="Paste URL..."
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
          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
