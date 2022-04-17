import { Item } from ".";

export type Ammo = Item;

export type AmmoName = "Missile" | "Javelin" | "Rocket";

export const Ammos: Record<AmmoName, Ammo> = {
  Missile: {
    label: "Missile",
  },
  Javelin: {
    label: "Javelin Rocket",
  },
  Rocket: {
    label: "Heavy Rocket",
  },
};
