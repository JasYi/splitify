import React from "react";
import { useNavigate } from "react-router-dom";
import Spotify from "../components/spotify";
import "../css/Results.css";

export default function Results() {
  const urlSearchString = window.location.search;
  const params = new URLSearchParams(urlSearchString);
  var uri_str = params.get("uris");
  var uris = uri_str.split(",");

  const uri_items = uris.map((elem) => <Spotify uri={elem.trim()} />);

  return (
    <div>
      <h1>Your Playlists:</h1>
      <div className="playlists">{uri_items}</div>
    </div>
  );
}
