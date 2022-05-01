import Victor from "victor";
import { SpriteName } from "../factories/SpriteFactory";
import { IRenderable } from "../interfaces";
import { Entity } from "./Entity";

type Team = "Independent" | "Player" | "Rebellion" | "Confederacy";

type ShipType = "Blue" | "Red";

export class Ship extends Entity implements IRenderable {
  position: Victor;
  velocity: Victor;
  yaw: Victor;
  angularVelocity: number; // radians per second
  zIndex: number;
  sprite: SpriteName;

  constructor(args: {
    spawned: number;
    shipType: ShipType;
    team: Team;
    position: Victor;
    yaw: Victor;
  }) {
    super(args.spawned);
    (this.yaw = args.yaw), (this.position = args.position);
    this.angularVelocity = 0;
    this.velocity = new Victor(0, 0);
    this.sprite = "BlueShip";
    this.zIndex = 1;
  }
}
