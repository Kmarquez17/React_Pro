import React from "react";
import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handleClick = () => {
    if (!isMapReady) throw new Error("El mapa no esta listo");
    if (!userLocation) throw new Error("No hay ubicacion de usuario");

    map?.flyTo({
      center: userLocation,
      zoom: 15,
    });
  };
  return (
    <button
      className="btn btn-primary"
      style={{ position: "fixed", top: "20px", zIndex: 999, right: "20px" }}
      onClick={handleClick}
    >
      Mi ubicación
    </button>
  );
};
