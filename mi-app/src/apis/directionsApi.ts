import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview:'simplified',
    steps:false,
    access_token:
      "pk.eyJ1Ijoia21hcnF1ZXoxNyIsImEiOiJja21kdTRxd3QyY2N0MnBzOXZncGhkNnR6In0.tAZZTSGr95xBzog-Vy0O-g",
  },
});

export default directionsApi;
