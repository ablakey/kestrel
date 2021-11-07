import Victor from "victor";
import blueShip from "../assets/pixel_ship_blue.png";
import redShip from "../assets/pixel_ship_red.png";
import { Direction, Tag, Thrust } from "../enum";
import { ValueOf } from "../types";
import { BaseFactory } from "./BaseFactory";

export class ShipFactory extends BaseFactory {
  public static readonly ShipTypes = {
    Blue: {
      health: 100,
      texture: blueShip,
    },
    Red: {
      health: 100,
      texture: redShip,
    },
  };

  create(opts: {
    pos: Victor;
    yaw: number;
    shipType: ValueOf<typeof ShipFactory.ShipTypes>;
    tags?: Tag[];
  }) {
    return this.ecs.addEntity(
      {
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
        armament: {
          kind: "Armament",
          primaryCooldownUntil: 0,
          primaryFire: false,
          currentWeapon: "LaserCannon",
          weapons: {},
          // Ships need to contain an array of primaryWeapons and one currentPrimaryWeapon.
          // The weapon will define the speed, rate, and other properties about firing a bullet.
          // But the bullet itself will define what it looks like, its damage, etc.
        },
        stats: {
          kind: "Stats",
          health: opts.shipType.health,
          damageEffects: [],
        },
        sprite: {
          kind: "Sprite",
          texture: opts.shipType.texture,
        },
      },
      opts.tags
    );
  }
}
