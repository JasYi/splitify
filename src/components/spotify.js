import React from "react";
import "../css/Spotify.css";

export default function Spotify({ uri }) {
  function uri_to_url(uri_in) {
    var uri_components = uri_in.split(":");
    return "https://open.spotify.com/embed/playlist/" + uri_components[2];
  }

  var url = uri_to_url(uri);

  return (
    <div className="embed">
      <iframe
        src={url}
        className="frame"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
