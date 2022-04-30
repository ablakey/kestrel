import Victor from "victor";
import { Entity } from "./Entity";

type Team = "Independent" | "Player" | "Rebellion" | "Confederacy";

type ShipType = "Blue" | "Red";

export class Ship extends Entity {
  position: Victor;
  velocity: Victor;
  yaw: Victor;
  angularVelocity: number; // radians per second

  constructor(args: { spawned: number; shipType: ShipType; team: Team; position: Victor }) {
    super(args.spawned);
    this.position = args.position;
  }
}
