import React, { ChangeEvent, useRef, useContext } from "react";
import { PlacesContext } from "../context";

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>();
  const { searchPlacesByQuery } = useContext(PlacesContext);
  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      // TODO: buscar o ejecutar consulta
      console.log(`Searching for ${value}`);
      searchPlacesByQuery(value);
    }, 1000);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar"
        onChange={onQueryChanged}
      />
    </div>
  );
};
