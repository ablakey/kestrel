import { Entity } from "../entities/Entity";
import { Ship } from "../entities/Ship";
import { System } from "./System";

export class CleanupSystem extends System {
  update() {
    this.engine.entities.ships.forEach(this.updateShip);
    this.engine.entities.bullets.forEach(this.updateEntity);
    this.engine.entities.doodads.forEach(this.updateEntity);
  }

  private updateShip(ship: Ship) {
    /**
     * Tick all cooldowns.
     */
    ship.cooldowns.forEach((lastCooldown, name) => {
      const newCooldown = Math.max(lastCooldown - this.engine.delta, 0);
      ship.cooldowns.set(name, newCooldown);
    });

    this.updateEntity(ship);
  }

  private updateEntity(entity: Entity) {
    if (entity.timeToLive) {
      entity.timeToLive = Math.max(entity.timeToLive - this.engine.delta, 0);
    }

    if (entity.timeToLive === 0) {
      entity.destroyed = true;
    }
  }
}
