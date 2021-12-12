import { cloneDeep } from "lodash";
import Victor from "victor";
import {
  CombatBehaviour,
  Condition,
  Direction,
  MovementBehaviour,
  StrategyBehaviour,
  Team,
  Thrust,
} from "../enum";
import { ShipName, Ships } from "../Items/Ships";
import { BaseUtility } from "./BaseUtility";

export class ShipFactory extends BaseUtility {
  create(opts: {
    x: number;
    y: number;
    yaw: number;
    shipName: ShipName;
    team: Team;
    runAi?: boolean;
  }) {
    const shipType = Ships[opts.shipName];

    return this.game.entities.add({
      description: {
        kind: "Description",
        label: shipType.label,
      },
      engine: {
        kind: "Engine",
        direction: Direction.None,
        thrust: Thrust.None,
      },
      politics: {
        kind: "Politics",
        relations: this.game.state.instanceRelations[opts.team],
        team: opts.team,
      },
      body: {
        kind: "Body",
        position: new Victor(opts.x, opts.y),
        yaw: new Victor(1, 0).rotate(opts.yaw),
        velocity: new Victor(0, 0),
        angularVelocity: 0,
      },
      inventory: {
        kind: "Inventory",
        weapons: cloneDeep(shipType.weapons),
      },
      offensive: {
        kind: "Offensive",
        primaryFire: false,
        bulletOffset: shipType.radius, // TODO: remove this duplicate.
        target: null,
        // Ships need to contain an array of primaryWeapons and one currentPrimaryWeapon.
        // The weapon will define the speed, rate, and other properties about firing a bullet.
        // But the bullet itself will define what it looks like, its damage, etc.
      },
      health: {
        kind: "Health",
        hp: shipType.hp,
        effects: [],
        timeToLive: null,
        condition: Condition.Alive,
      },
      kinematics: {
        kind: "Kinematics",
        maxSpeed: shipType.maxSpeed,
        acceleration: shipType.acceleration,
        turnRate: shipType.turnRate,
      },
      sprite: {
        kind: "Sprite",
        sprite: shipType.sprite,
        offsetX: shipType.offsetX,
        offsetY: shipType.offsetY,
      },
      ai: {
        kind: "Ai",
        strategy: StrategyBehaviour.None,
        combatBehaviour: opts.runAi ? CombatBehaviour.Aggressive : CombatBehaviour.None,
        movementBehaviour: opts.runAi ? MovementBehaviour.PointAt : MovementBehaviour.None,
      },
    });
  }
}

export type ShipEntity = ReturnType<ShipFactory["create"]>;
