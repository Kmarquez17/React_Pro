import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1Ijoia21hcnF1ZXoxNyIsImEiOiJja21kdTRxd3QyY2N0MnBzOXZncGhkNnR6In0.tAZZTSGr95xBzog-Vy0O-g",
  },
});

export default searchApi;
