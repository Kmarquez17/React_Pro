/* eslint import/no-webpack-loader-syntax: off */
import { createContext } from "react";

//@ts-ignore
import { Map } from "!mapbox-gl";

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;

  //Funtions 
  setMap: (map: Map) => void;
  getRouteBetweenPonints: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext({} as MapContextProps);
