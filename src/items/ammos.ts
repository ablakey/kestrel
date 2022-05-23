import { ItemDefinition } from ".";
import { asTypedObject } from "../utils";

type AmmoDefinition = ItemDefinition; // TODO: So far they have no additional properties.

export const ammoDefinitions = asTypedObject<AmmoDefinition>()({
  Missile: {
    label: "Missile",
  },
  Javelin: {
    label: "Javelin Rocket",
  },
  Rocket: {
    label: "Heavy Rocket",
  },
});
