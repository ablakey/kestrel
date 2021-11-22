import Victor from "victor";
import { Direction, MovementBehaviour, Team, Thrust } from "../enum";
import { ShipName, Ships } from "../Items/Ships";
import { BaseUtility } from "./BaseUtility";

export class ShipFactory extends BaseUtility {
  create(opts: { x: number; y: number; yaw: number; shipName: ShipName; team: Team }) {
    const shipType = Ships[opts.shipName];

    return this.ecs.addEntity({
      Engine: {
        kind: "Engine",
        direction: Direction.None,
        thrust: Thrust.None,
      },
      Politics: {
        kind: "Politics",
        team: opts.team,
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
        weapons: shipType.weapons.map((w) => {
          return { name: w };
        }),
      },
      Offensive: {
        kind: "Offensive",
        primaryCooldownUntil: 0,
        primaryFire: false,
        bulletOffset: shipType.radius, // TODO: remove this duplicate.
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
        maxSpeed: shipType.maxSpeed,
        acceleration: shipType.acceleration,
        turnRate: shipType.turnRate,
      },
      Sprite: {
        kind: "Sprite",
        texture: shipType.texture,
        offsetX: shipType.offsetX,
        offsetY: shipType.offsetY,
      },
      AI: {
        kind: "AI",
        movementBehaviour: MovementBehaviour.None,
      },
    });
  }
}

export type ShipEntity = ReturnType<ShipFactory["create"]>;
