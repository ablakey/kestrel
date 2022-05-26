import { ItemDefinition } from ".";
import { asTypedObject } from "../utils";

type AmmoDefinition = ItemDefinition; // TODO: So far they have no additional properties.

/**
 * Ammos only define what's needed for them to be shop items.
 * The actual properties of ammo are kept on the weapons that fire them.
 */
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
