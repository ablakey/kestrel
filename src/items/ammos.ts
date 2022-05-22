import { AmmoType, ItemDefinition } from ".";

type AmmoDefinition = ItemDefinition; // TODO: So far they have no additional properties.

export const Ammos: Record<AmmoType, AmmoDefinition> = {
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
