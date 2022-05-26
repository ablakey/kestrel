import { Ship } from "../types/Ship";
import { System } from "./System";

export class CleanupSystem extends System {
  update(ship: Ship, delta: number) {
    /**
     * Tick all cooldowns.
     */
    ship.cooldowns.forEach((lastCooldown, name) => {
      const newCooldown = Math.max(lastCooldown - delta, 0);
      ship.cooldowns.set(name, newCooldown);
    });
  }
}
