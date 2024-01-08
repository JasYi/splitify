import React, { useState } from "react";
import "../css/Home.css";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Home() {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "https://splitify-jasyi.vercel.app/form";
  const clientId = "1e6468d842fc486d9ae83b38b8ec164b";
  const scopes = "playlist-modify-private";

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&show_dialog=true`;

  return (
    <div className="wrapper">
      <h1 className="title">Splitify</h1>
      <h3 className="subtitle">
        Just a fun project to split your egregiously large playlists :)
      </h3>
      <h3>Currently in testing! Please email jason.yi2015@gmail.com to use.</h3>
      <h2>How it works:</h2>
      <ul className="instructions">
        <li>1. Log in with Spotify</li>
        <li>2. Specify how you want your playlist split</li>
        <li>3. Get your playlists cut down to size!</li>
      </ul>
      <a href={loginUrl} className="auth-btn">
        Log in With Spotify
      </a>
    </div>
  );
}
