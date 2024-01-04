import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Buffer } from "buffer";
import "../css/Form.css";

export default function Form() {
  // backend for incrementing the count variable
  let [count, setCount] = useState(3);
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [checked, setChecked] = useState(false);
  var api_url = "http://jasyi.pythonanywhere.com/callback";
  const clientId = "1e6468d842fc486d9ae83b38b8ec164b";
  const secret = "dc65a07e6ccf4439bf0e05bc9ab1e189";

  // for extracting the token
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [searchParams] = useSearchParams();

  // used for authentication

  // extracting the token
  useEffect(() => {
    window.Buffer = Buffer;

    var code = searchParams.get("code");
    var redirect = "https://splitify-jasyi.vercel.app/form";

    var auth_data = {
      code: code,
      redirect_uri: redirect,
      grant_type: "authorization_code",
    };

    const authParams = new URLSearchParams(auth_data);
    console.log(
      "https://accounts.spotify.com/api/token?" + authParams.toString()
    );
    fetch("https://accounts.spotify.com/api/token?" + authParams.toString(), {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(clientId + ":" + secret).toString("base64"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
      })
      .catch((error) => {
        console.log(error);
        setToken("error");
        setRefreshToken("error");
      });
  }, []);

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
    const data = {
      playlist: playlistUrl,
      num: count,
      ideal: checked,
      tokenIn: token,
      refresh: refreshToken,
    };
    const createParms = new URLSearchParams(data);
    console.log(api_url + "?" + createParms.toString());
    window.location.href = api_url + "?" + createParms.toString();
    return false;
  }

  return (
    <div>
      <h1 className="title">Splitify</h1>
      <h3 className="subtitle">
        Just a fun project to split your egregiously large playlists :)
      </h3>
      <div className="form">
        <form>
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
        </form>
        <button onClick={submitToAPI} className="submit-btn">
          SUBMIT
        </button>
      </div>
    </div>
  );
}
