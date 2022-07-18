import { Ship } from "../entities/Ship";
import { System } from "./System";

export class SimSystem extends System {
  update() {
    this.engine.entities.ships.forEach(this.updateOne);
  }

  private updateOne(entity: Ship) {
    entity.sim?.tick();
  }
}
