import React from "react";
import ReactDOM from "react-dom";
import  MapsApp from "./MapsApp";


if(!navigator.geolocation)  {
  alert('Tu navegador no tiene opcion de geolocation')
  throw new Error('Tu navegador no tiene opcion de geolocation')
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById("root")
);
