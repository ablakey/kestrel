import { BaseDefinition } from ".";
import { SpriteName } from "../factories/SpriteFactory";
import { asTypedObject } from "../utils";

// Note how it's not ItemDefinition. Doodads do not exist in inventory/stores.
export type DoodadDefinition = BaseDefinition & {
  sprite: SpriteName;
  timeToLive: number;
};

export const doodadDefinitions = asTypedObject<DoodadDefinition>()({
  SmallExplosion: {
    sprite: "SmallExplosion",
    timeToLive: 1_000,
  },
  LargeExplosion: {
    sprite: "LargeExplosion",
    timeToLive: 1_000,
  },
});
