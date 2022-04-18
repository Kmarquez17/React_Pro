import React from "react";
import ReactDOM from "react-dom";
import  MapsApp from "./MapsApp";
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1Ijoia21hcnF1ZXoxNyIsImEiOiJja21kdTRxd3QyY2N0MnBzOXZncGhkNnR6In0.tAZZTSGr95xBzog-Vy0O-g';


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
