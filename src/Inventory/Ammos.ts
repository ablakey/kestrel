import { Item } from ".";

export type Ammo = Item;

export type AmmoName = "Missile" | "Javelin";

export const Ammos: Record<AmmoName, Ammo> = {
  Missile: {
    label: "Missile",
  },
  Javelin: {
    label: "Javelin Rocket",
  },
};
