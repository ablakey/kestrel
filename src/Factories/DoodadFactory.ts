import Victor from "victor";
import { ZIndexes } from "../config";
import { PlanetName, Planets } from "../Items/Planets";
import { BaseFactory } from "./BaseFactory";
import { SpriteName } from "./SpriteFactory";

export class DoodadFactory extends BaseFactory {
  /**
   * Spawn a sprite in a fixed position.
   * These cannot be interacted with. Explosions, jettisonned cargo, etc.
   */
  spawnSprite(position: Victor, name: SpriteName) {
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
        name,
        zIndex: ZIndexes.Explosion,
      },
    });
  }

  spawnPlanet(position: Victor, name: PlanetName) {
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
