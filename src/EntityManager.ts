import { Entity, EntityId } from "./types/Entity";
import { Ship } from "./types/Ship";

export class EntityManager {
  private _entities: Map<EntityId, Entity>;
  private _ships: Map<EntityId, Ship>;

  constructor() {
    this._entities = new Map();
    this._ships = new Map();
  }

  get entities() {
    return this._entities;
  }

  get ships() {
    return this._ships;
  }

  addShip(ship: Ship) {
    this._entities.set(ship.id, ship);
    this._ships.set(ship.id, ship);
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
