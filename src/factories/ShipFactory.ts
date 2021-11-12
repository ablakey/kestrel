import Victor from "victor";
import { Direction, Thrust } from "../enum";
import { ShipName, Ships } from "../Items/Ships";
import { BaseFactory } from "./BaseFactory";

export class ShipFactory extends BaseFactory {
  create(opts: { pos: Victor; yaw: number; shipName: ShipName }) {
    const shipType = Ships[opts.shipName];

    return this.ecs.addEntity({
      engine: {
        kind: "Engine",
        direction: Direction.Right,
        thrust: Thrust.None,
      },
      body: {
        kind: "Body",
        pos: opts.pos.clone(),
        yaw: opts.yaw,
        vel: new Victor(0, 0),
      },
      offensive: {
        kind: "Offensive",
        primaryCooldownUntil: 0,
        primaryFire: false,
        bulletOffset: shipType.radius,
        // Ships need to contain an array of primaryWeapons and one currentPrimaryWeapon.
        // The weapon will define the speed, rate, and other properties about firing a bullet.
        // But the bullet itself will define what it looks like, its damage, etc.
      },
      health: {
        kind: "Health",
        hp: shipType.hp,
        effects: [],
      },
      sprite: {
        kind: "Sprite",
        texture: shipType.texture,
      },
    });
  }
}
