import { Entity, EntityId } from "./types/Entity";
import { PlayerShip, Ship } from "./types/Ship";
import { assert } from "./utils";

export class EntityManager {
  private _entities: Map<EntityId, Entity>;
  private _ships: Map<EntityId, Ship>;
  private _playerShip: PlayerShip | null;

  constructor() {
    this._playerShip = null;
    this._entities = new Map();
    this._ships = new Map();
  }

  get entities() {
    return this._entities;
  }

  get ships() {
    return this._ships;
  }

  getShip(entityId: EntityId | null) {
    if (entityId === null) {
      return null;
    }
    return this._ships.get(entityId);
  }

  get playerShip() {
    assert(this._playerShip);
    return this._playerShip;
  }

  addShip(ship: Ship) {
    this._entities.set(ship.id, ship);
    this._ships.set(ship.id, ship);
  }

  setPlayerShip(ship: PlayerShip) {
    this._playerShip = ship;
    this.addShip(ship);
  }

  clearDestroyed() {
    this._entities.forEach((e) => {
      if (e.destroyed) {
        this._entities.delete(e.id);
        this._ships.delete(e.id);
      }
    });
  }

  /**
   * From all possible targets, get the next one by indexing one beyond previousTarget.
   * This depends on game.query returning stable results.
   */
  public getNextTarget(currentTarget: number | null, offsetIndex?: number): number | null {
    const targets = Array.from(this.ships.values());

    if (!targets.length) {
      return null;
    }

    const currentTargetIndex = targets.findIndex((e) => e.id === currentTarget);

    if (currentTargetIndex === -1) {
      return targets[0].id;
    } else {
      const newTarget = targets.at((currentTargetIndex + (offsetIndex ?? 0)) % targets.length);
      assert(newTarget);
      return newTarget.id;
    }
  }
}
