import Victor from "victor";
import { Direction, Thrust } from "../enum";
import { ShipName, Ships } from "../Items/Ships";
import { BaseFactory } from "./BaseFactory";

export class ShipFactory extends BaseFactory {
  create(opts: { x: number; y: number; yaw: number; shipName: ShipName }) {
    const shipType = Ships[opts.shipName];

    return this.ecs.addEntity({
      engine: {
        kind: "Engine",
        direction: Direction.Right,
        thrust: Thrust.None,
      },
      body: {
        kind: "Body",
        position: new Victor(opts.x, opts.y),
        yaw: opts.yaw,
        velocity: new Victor(0, 0),
        angularVelocity: 0,
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
      kinematics: {
        kind: "Kinematics",
        maxSpeed: 500,
        acceleration: 100,
        turnRate: 2,
      },
      sprite: {
        kind: "Sprite",
        texture: shipType.texture,
      },
    });
  }
}
