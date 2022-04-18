import { createContext } from "react";
import { Map } from "mapbox-gl";

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;

  //Funtions 
  setMap: (map: Map) => void;
}

export const MapContext = createContext({} as MapContextProps);
