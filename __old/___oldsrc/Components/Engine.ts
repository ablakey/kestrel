import { ShipEntity } from "../Factories/ShipFactory";

export interface Engine {
  kind: "Engine";
  direction: "None" | "Left" | "Right";
  thrust: "None" | "Forward";
}

export class Engine {
  public static thrustEnabled(ship: ShipEntity): boolean {
    return ship.components.health.condition !== "Destroying";
  }

  public static turnEnabled(ship: ShipEntity): boolean {
    return ship.components.health.condition !== "Destroying";
  }
}
