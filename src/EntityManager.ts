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
}
