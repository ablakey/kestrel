import { Bullet } from "../entities/Bullet";
import { Entity } from "../entities/Entity";
import { Ship } from "../entities/Ship";
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
    if (entity.timeToLive) {
      entity.timeToLive = Math.max(entity.timeToLive - delta, 0);
    }

    if (entity.timeToLive === 0) {
      entity.destroyed = true;
    }
  }
}
