import { Ship } from "../entities/Ship";
import { System } from "./System";

export class StrategySystem extends System {
  update() {
    this.engine.entities.ships.forEach(this.updateOne);
  }

  private updateOne(ship: Ship) {
    // Player ship doesn't currently do strategy.
    if (ship === this.engine.entities.playerShip) {
      return;
    }

    // TODO: This system will set Strategy on ships based on conditions.
    // I'm not yet sure if this really is necessary.  GameSimulation will set a Strategy.
    // I guess this system could change strategy when it sees fit.  Ie. no more target left, etc.
  }
}
