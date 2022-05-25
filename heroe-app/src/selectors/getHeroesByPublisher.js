import { heroes } from "../data/Heroes";

export const getHeroesByPublisher = (publisher) => {
  const validaPublisher = ["DC Comics", "Marvel Comics"];

  if (!validaPublisher.includes(publisher)) {
    throw new Error(`${publisher} is not a valid publisher`);
  }

  return heroes.filter((hero) => hero.publisher === publisher);
};
