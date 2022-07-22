import { BaseDefinition } from ".";
import { SpriteName } from "../factories/SpriteFactory";
import { asTypedObject } from "../utils";

// Note how it's not ItemDefinition. Planets do not exist in inventory/stores.
export type PlanetDefinition = BaseDefinition & {
  sprite: SpriteName;
};

export const planetDefinitions = asTypedObject<PlanetDefinition>()({
  levo: {
    sprite: "GreenPlanet1",
  },
});
