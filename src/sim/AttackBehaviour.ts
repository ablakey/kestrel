import { assert } from "ts-essentials";
import { Engine } from "../Engine";
import { Ship } from "../entities/Ship";

export function attackBehaviour(engine: Engine, ship: Ship) {
  /**
   * If no target, find one:
   */
  if (!ship.target) {
    ship.target = engine.entities.ships.get(1)?.id ?? null;
  }
  // TODO: find hostile ship.
  // If no hostile ship. Return.

  /**
   * Aim at ship.
   */
  const target = engine.entities.ships.get(ship.target);
  assert(target);
  ship.turnTowards(target.position, 0.3);

  /**
   * Fire primary weapons if aimed at ship.
   * Fire only if within range. (effective range +10%)
   */
}
