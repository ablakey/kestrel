import Victor from "victor";
import { ZIndexes } from "../config";
import { BaseFactory } from "./BaseFactory";
import { SpriteName } from "./SpriteFactory";

export type PlanetName = "Levo";

type Planet = {
  label: string;
  sprite: SpriteName;
};

const Planets: Record<PlanetName, Planet> = {
  Levo: {
    label: "Levo",
    sprite: "GreenPlanet1",
  },
};

export class PlanetFactory extends BaseFactory {
  create(position: Victor, name: PlanetName) {
    const planet = Planets[name];

    this.game.entities.add({
      body: {
        kind: "Body",
        position,
        yaw: new Victor(1, 0),
        velocity: new Victor(0, 0),
        angularVelocity: 0,
      },
      sprite: {
        kind: "Sprite",
        name: planet.sprite,
        zIndex: ZIndexes.Planet,
      },
      navigable: {
        kind: "Navigable",
      },
      description: {
        kind: "Description",
        label: planet.label,
      },
    });
  }
}
