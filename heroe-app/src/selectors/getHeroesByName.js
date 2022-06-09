import { heroes } from "../data/Heroes";

export const getHeroesByName = (name = "") => {
  if (name.length === 0) {
    return [];
  }

  console.log('Tumadreeeeeeee')

  name = name.toLowerCase();
  return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
};
