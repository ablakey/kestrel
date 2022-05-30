import { Bullet } from "../types/Bullet";
import { Entity } from "../types/Entity";
import { Ship } from "../types/Ship";
import { System } from "./System";

export class CleanupSystem extends System {
  updateShip(ship: Ship, delta: number) {
    /**
     * Tick all cooldowns.
     */
    ship.cooldowns.forEach((lastCooldown, name) => {
      const newCooldown = Math.max(lastCooldown - delta, 0);
      ship.cooldowns.set(name, newCooldown);
    });

    this.update(ship, delta);
  }

  updateBullet(bullet: Bullet, delta: number) {
    this.update(bullet, delta);
    // TODO
  }

  private update(entity: Entity, delta: number) {
    if (entity.timeToDestroyed) {
      entity.timeToDestroyed = Math.max(entity.timeToDestroyed - delta, 0);
    }

    if (entity.timeToDestroyed === 0) {
      entity.destroyed = true;
    }
  }
}
