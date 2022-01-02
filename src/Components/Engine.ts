import { Condition, Direction, Thrust } from "../enum";
import { ShipEntity } from "../Factories/ShipFactory";

export interface Engine {
  kind: "Engine";
  direction: Direction;
  thrust: Thrust;
}

export class Engine {
  public static thrustEnabled(ship: ShipEntity): boolean {
    return ship.components.health.condition !== Condition.Destroying;
  }

  public static turnEnabled(ship: ShipEntity): boolean {
    return ship.components.health.condition !== Condition.Destroying;
  }
}
