/* eslint import/no-webpack-loader-syntax: off */
import { useReducer, useContext, useEffect } from "react";

//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

import { PlacesContext } from "../";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const { places } = useContext(PlacesContext);

  useEffect(() => {
    const newMakers: Marker[] = [];
    state.markers.forEach((marker) => marker.remove());

    if (state.map) {
      for (let place of places) {
        const [lng, lat] = place.center;

        const popup = new Popup().setHTML(`
          <h6>${place.text_es}</h6>
          <p>${place.place_name_es}</p>
        `);

        const newMarker = new Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(state.map);

        newMakers.push(newMarker);
      }
    }

    //TODO: eliminar polylines

    dispatch({ type: "setMarkers", payload: newMakers });
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
      <h4>Aqui estoy</h4>
      <p>En algún lugar del mundo</p>
    `);

    new Marker({
      color: "#61DAFB",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  const getRouteBetweenPonints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const response = await directionsApi.get<DirectionsResponse>(`/${start.join(",")};${end.join(",")}`);
    console.log(response)
    const {distance, duration,geometry} = response.data.routes[0];

    const {coordinates: coords} = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100)
    kms/=100;

    const minutes = Math.floor(duration / 60);

    console.log({kms, minutes})

    const bounds = new LngLatBounds(start, start)

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord)      
    }

    state.map?.fitBounds(bounds,{padding:200})

    //polyline

    const sourceData : AnySourceData = { 
      type:'geojson',
      data: {
        type:'FeatureCollection',
        features:[
          {
            type:'Feature',
            properties:{},
            geometry:{
              type:'LineString',
              coordinates:coords
            }
          }
        ]
      }
    }

    if(state.map?.getLayer('RouteString')){ 
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    state.map?.addSource('RouteString',sourceData)
    state.map?.addLayer({
      id:'RouteString',
      type:'line',
      source:'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }      
    })

    
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        //Funtions
        setMap,
        getRouteBetweenPonints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
