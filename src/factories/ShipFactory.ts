import Victor from "victor";
import { ShipBehaviour, Direction, Thrust, MovementBehaviour } from "../enum";
import { ShipName, Ships } from "../Items/Ships";
import { BaseFactory } from "./BaseFactory";

export class ShipFactory extends BaseFactory {
  create(opts: {
    x: number;
    y: number;
    yaw: number;
    shipName: ShipName;
    behaviour: ShipBehaviour;
  }) {
    const shipType = Ships[opts.shipName];

    return this.ecs.addEntity({
      Engine: {
        kind: "Engine",
        direction: Direction.None,
        thrust: Thrust.None,
      },
      Body: {
        kind: "Body",
        position: new Victor(opts.x, opts.y),
        yaw: new Victor(1, 0).rotate(opts.yaw),
        velocity: new Victor(0, 0),
        angularVelocity: 0,
      },
      Inventory: {
        kind: "Inventory",
        weapons: [{ name: "LaserCannon" }], // TODO.
      },
      Offensive: {
        kind: "Offensive",
        primaryCooldownUntil: 0,
        primaryFire: false,
        bulletOffset: shipType.radius,
        target: null,
        // Ships need to contain an array of primaryWeapons and one currentPrimaryWeapon.
        // The weapon will define the speed, rate, and other properties about firing a bullet.
        // But the bullet itself will define what it looks like, its damage, etc.
      },
      Health: {
        kind: "Health",
        hp: shipType.hp,
        effects: [],
      },
      Kinematics: {
        kind: "Kinematics",
        maxSpeed: 500,
        acceleration: 100,
        turnRate: 2,
      },
      Sprite: {
        kind: "Sprite",
        texture: shipType.texture,
      },
      Player: opts.behaviour === ShipBehaviour.Player ? { kind: "Player" } : undefined,
      AI:
        opts.behaviour === ShipBehaviour.Aggressive
          ? { kind: "AI", behaviour: opts.behaviour, movementBehaviour: MovementBehaviour.PointAt }
          : undefined,
    });
  }
}
