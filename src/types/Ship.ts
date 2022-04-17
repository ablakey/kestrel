import Victor from "victor";

type Team = "Independent" | "Player" | "Rebellion" | "Confederacy";

type ShipType = "Blue" | "Red";

export class Ship {
  position: Victor;
  velocity: Victor;
  yaw: Victor;
  angularVelocity: number; // radians per second

  constructor(shipType: ShipType, team: Team, position: Victor) {
    this.position = position;
  }
}
