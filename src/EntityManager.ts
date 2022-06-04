import Victor from "victor";
import { Bullet } from "./entities/Bullet";
import { Entity, EntityId } from "./entities/Entity";
import { PlayerShip, Ship } from "./entities/Ship";
import { assert } from "./utils";

export class EntityManager {
  private _entities: Map<EntityId, Entity>;
  private _ships: Map<EntityId, Ship>;
  private _bullets: Map<EntityId, Bullet>;
  private _visualEffects: Map<EntityId, VisualEffect>;
  private _playerShip: PlayerShip | null;

  constructor() {
    this._playerShip = null;
    this._entities = new Map();
    this._ships = new Map();
    this._bullets = new Map();
    this._visualEffects = new Map();
  }

  get entities() {
    return this._entities;
  }

  get ships() {
    return this._ships;
  }

  get bullets() {
    return this._bullets;
  }

  get visualEffects() {
    return this._visualEffects;
  }

  getShip(entityId: EntityId | null) {
    if (entityId === null) {
      return null;
    }
    return this._ships.get(entityId) ?? null;
  }

  getNearbyShips(position: Victor, distance: number) {
    return [...this.ships.values()].filter((s) => s.position.distance(position) <= distance);
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

  addBullet(bullet: Bullet) {
    this._entities.set(bullet.id, bullet);
    this._bullets.set(bullet.id, bullet);
  }

  clearDestroyed() {
    this._entities.forEach((e) => {
      if (e.destroyed) {
        this._entities.delete(e.id);
        this._ships.delete(e.id);
        this._bullets.delete(e.id);
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
