import Victor from "victor";
import { BaseFactory } from "./BaseFactory";
import { SpriteName } from "./SpriteFactory";

export class DoodadFactory extends BaseFactory {
  /**
   * Spawn a sprite in a fixed position.
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
      },
    });
  }
}
