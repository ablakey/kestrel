import { Component } from "./components";
import { Entities } from "./EntityManager";
import { AICombatSystem } from "./Systems/AICombatSystem";
import { AIMovementSystem } from "./Systems/AIMovementSystem";
import { BulletSystem } from "./Systems/BulletSystem";
import { CleanupSystem } from "./Systems/CleanupSystem";
import { CombatSystem } from "./Systems/CombatSystem";
import { EngineSystem } from "./Systems/EngineSystem";
import { InputSystem } from "./Systems/InputSystem";
import { MovementSystem } from "./Systems/MovementSystem";
import { RenderSystem } from "./Systems/RenderSystem";
import { StatsSystem } from "./Systems/StatsSystem";
import { Audio } from "./Utilities/audio";
import { BulletFactory } from "./Utilities/BulletFactory";
import { ShipEntity, ShipFactory } from "./Utilities/ShipFactory";
import { assert } from "./utils";

/**
 * An ordered list of systems, invokved in the order described here.
 */
const SystemCreators = [
  InputSystem,
  AIMovementSystem,
  AICombatSystem,
  EngineSystem,
  MovementSystem,
  CombatSystem,
  BulletSystem,
  StatsSystem,
  RenderSystem,
  CleanupSystem,
];

export type Kind = Component["kind"];

export interface System {
  componentKinds: Kind[];
  onTick?: (delta: number) => void;
  update?: (entity: Entity<Kind>, delta: number) => void;
}

export type Components<T extends Kind> = {
  [key in T]: Extract<Component, { kind: key }>;
};

export type Entity<T extends Kind = Exclude<Kind, Kind>> = {
  id: number;
  spawned: number;
  components: Required<Components<T>> & Partial<Components<Exclude<Kind, T>>>;
  lifespan?: number;
  destroyed: boolean;
};

export class ECS {
  private systems: System[];
  public elapsed = 0;
  public entities: Entities;

  /**
   * Helpers / utilities / factories.
   */
  public bulletFactory: BulletFactory;
  public shipFactory: ShipFactory;
  public audio: Audio;

  constructor() {
    this.bulletFactory = new BulletFactory(this);
    this.shipFactory = new ShipFactory(this);
    this.audio = new Audio(this);
    this.systems = SystemCreators.map((s) => s(this));
    this.entities = new Entities(this);
  }

  // public get entityCount(): number {
  //   return this.entities.size;
  // }

  public getPlayer() {
    const player = this.entities.query(["Player"])[0];
    assert(player);
    return player as ShipEntity;
  }

  public start() {
    requestAnimationFrame(this.tick.bind(this));
  }

  /**
   * For each system, query all relevant entities based on components, call update on the system for
   * each entity, independently. If a system has no entities to act on, it is not run.
   */
  private tick(timestamp: number) {
    const delta = timestamp - this.elapsed;
    this.elapsed = timestamp;

    /**
     * Flag entities for deletion.
     * This gives systems one more chance to act on them, cleaning up.
     */
    this.entities.forEach((e) => {
      if (e.lifespan !== undefined && this.elapsed > e.spawned + e.lifespan) {
        e.destroyed = true;
      }
    });

    /**
     * Call onTick for every system. This is called once per tick and can be used for a system
     * to perform tasks once each cycle.
     */
    this.systems.forEach((s) => {
      s.onTick?.(delta);
    });

    /**
     * For each system, walk every entity and see if they should be acted on.
     * If we don't know, because _systemIndexes[idx] === undefined then calculate it.
     */
    this.systems.forEach((sys) => {
      this.entities.forEach((e) => {
        if (this.entities.isMatch(e, sys.componentKinds)) {
          sys.update?.(e as Entity<Kind>, delta);
        }
      });
    });

    /**
     * Delete destroyed entities.
     */
    this.entities.forEach((e) => {
      if (e.destroyed) {
        this.entities._delete(e.id);
      }
    });

    requestAnimationFrame(this.tick.bind(this));
  }
}
