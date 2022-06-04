import Victor from "victor";
import { ZIndexes } from "../config";
import { BaseFactory } from "./BaseFactory";
import { SpriteName } from "./SpriteFactory";

export class DoodadFactory extends BaseFactory {
  /**
   * Spawn a sprite in a fixed position.
   * These cannot be interacted with. Explosions, jettisonned cargo, etc.
   */
  spawnSprite(position: Victor, name: SpriteName) {
    this.engine.entities.addVisualEffect({
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
}
