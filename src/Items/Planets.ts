import { Item } from ".";
import { SpriteName } from "../Factories/SpriteFactory";

export type PlanetName = "Levo";

export type Planet = Item & {
  name: string;
  sprite: SpriteName;
};

export const Planets: Record<PlanetName, Planet> = {
  Levo: {
    name: "Levo",
    label: "Levo",
    sprite: "GreenPlanet1",
  },
};
