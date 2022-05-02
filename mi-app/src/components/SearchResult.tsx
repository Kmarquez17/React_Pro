import { useContext, useState } from "react";
import { PlacesContext, MapContext } from "../context";
import { Feature } from "../interfaces/places";
import { LoadingPlaces } from "./LoadingPlaces";

export const SearchResult = () => {
  const [activeId, setActiveId] = useState("");
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPonints } = useContext(MapContext);

  const onPlacesClicked = (place: Feature) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);
    map?.flyTo({
      center: [lng, lat],
      zoom: 14,
    });
  };

  const getRoute = (place: Feature) => {
    if(!userLocation) return
    const [lng, lat] = place.center;

    getRouteBetweenPonints(userLocation,[lng, lat]) ;
  };

  if (isLoadingPlaces) return <LoadingPlaces />;

  return (
    <ul className={places.length === 0 ? "list-group" : "list-group mt-3"}>
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action pointer  ${
            activeId !== place.id ? "" : "active"
          }`}
          onClick={() => onPlacesClicked(place)}
        >
          <h6>{place.text_es}</h6>
          <p>{place.place_name}</p>
          <button
            onClick={() => getRoute(place)}
            className={`btn btn-sm ${
              activeId !== place.id
                ? "btn-outline-primary"
                : "btn-outline-light"
            }`}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
