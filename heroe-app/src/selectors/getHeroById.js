import { heroes } from "../data/Heroes";

export const getHeroById = (id) => {
  return heroes.filter((hero) => hero.id === id)[0];
};
