import { cloneDeep } from "lodash";
import Victor from "victor";
import { Politics } from "../Components";
import { ZIndexes } from "../config";
import { Components, Entity } from "../game";
import { ShipName, Ships } from "../Inventory/Ships";
import { NoneBehaviour } from "../Systems/AIStrategySystem/None";
import { BaseFactory } from "./BaseFactory";

/**
 * Tried to implcitly type based on the return type of entities.add() but it broke because of the
 * uppercase/lowercase shenanigans.  This explicitly defines the components found in a ship, so that
 * we can both verify that the factory is creating a valid ship, and that ShipEntity can be
 * defined.
 *
 * It's possible we could extract just the required keys from the returned Entity type.
 */
type ShipComponents = Components<
  | "Description"
  | "Engine"
  | "Politics"
  | "Body"
  | "Inventory"
  | "Offensive"
  | "Navigation"
  | "Health"
  | "Kinematics"
  | "Sprite"
  | "Ai"
>;

export type ShipEntity = Entity<ShipComponents[keyof ShipComponents]["kind"]>;

export class ShipFactory extends BaseFactory {
  create(opts: {
    position: Victor;
    yaw: number;
    shipName: ShipName;
    team: Politics["team"];
    runAi?: boolean;
  }): void {
    const shipType = Ships[opts.shipName];

    const shipComponents: ShipComponents = {
      description: {
        kind: "Description",
        label: shipType.label,
      },
      engine: {
        kind: "Engine",
        direction: "None",
        thrust: "None",
      },
      politics: {
        kind: "Politics",
        relations: this.game.state.instanceRelations[opts.team],
        team: opts.team,
      },
      body: {
        kind: "Body",
        position: opts.position,
        yaw: new Victor(1, 0).rotate(opts.yaw),
        velocity: new Victor(0, 0),
        angularVelocity: 0,
      },
      inventory: {
        kind: "Inventory",
        weapons: cloneDeep(shipType.weapons),
        ammos: cloneDeep(shipType.ammos),
      },
      offensive: {
        kind: "Offensive",
        firePrimary: false,
        fireSecondary: false,
        bulletOffset: shipType.radius, // TODO: remove this duplicate.
        target: null,
        selectedSecondary: null,
        // Ships need to contain an array of primaryWeapons and one currentPrimaryWeapon.
        // The weapon will define the speed, rate, and other properties about firing a bullet.
        // But the bullet itself will define what it looks like, its damage, etc.
      },
      navigation: {
        kind: "Navigation",
        goal: null,
      },
      health: {
        kind: "Health",
        hp: shipType.hp,
        effects: [],
        timeToLive: null,
        condition: "Alive",
      },
      kinematics: {
        kind: "Kinematics",
        maxSpeed: shipType.maxSpeed,
        accelSpeed: shipType.accelSpeed,
        turnRate: shipType.turnRate,
        size: shipType.size,
      },
      sprite: {
        kind: "Sprite",
        name: shipType.sprite,
        zIndex: ZIndexes.Ship,
      },
      ai: {
        kind: "Ai",
        behaviour: cloneDeep(NoneBehaviour.initialState),
        combatAction: "None",
        movementAction: "None",
      },
    };

    this.game.entities.add(shipComponents, { archetype: "ShipEntity" });
  }
}