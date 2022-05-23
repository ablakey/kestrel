import produce, { Draft } from "immer";
import { Component } from "./Components";
import { initialGameState } from "./config";
import { Entities } from "./EntityManager";
import { BulletFactory } from "./Factories/BulletFactory";
import { DoodadFactory } from "./Factories/DoodadFactory";
import { PlanetFactory } from "./Factories/PlanetFactory";
import { ShipFactory } from "./Factories/ShipFactory";
import { SoundFactory } from "./Factories/SoundFactory";
import { SpriteFactory } from "./Factories/SpriteFactory";
import { AICombatSystem } from "./Systems/AICombatSystem";
import { AIMovementSystem } from "./Systems/AIMovementSystem";
import { AIStrategySystem } from "./Systems/AIStrategySystem";
import { BulletSystem } from "./Systems/BulletSystem";
import { CleanupSystem } from "./Systems/CleanupSystem";
import { CombatSystem } from "./Systems/CombatSystem";
import { EngineSystem } from "./Systems/EngineSystem";
import { InputSystem } from "./Systems/InputSystem";
import { MinimapSystem } from "./Systems/MinimapSystem";
import { MovementSystem } from "./Systems/MovementSystem";
import { RenderSystem } from "./Systems/RenderSystem";
import { StatsSystem } from "./Systems/StatsSystem";
import { DeepReadonly, GameState } from "./types";

/**
 * An ordered list of systems, invokved in the order described here.
 */
const SystemCreators = [
  InputSystem,
  AIStrategySystem,
  AIMovementSystem,
  AICombatSystem,
  EngineSystem,
  MovementSystem,
  CombatSystem,
  BulletSystem,
  StatsSystem,
  RenderSystem,
  MinimapSystem,
  CleanupSystem,
];

export type Kind = Component["kind"];

export type Archetype = "ShipEntity" | "BulletEntity";

export interface System {
  kindsOrArchetype: Kind[] | Archetype; // List of kinds or an archetype.
  onTick?: (delta: number) => void;
  update?: (entity: Entity<Kind>, delta: number) => void;
}

export type Components<T extends Kind> = {
  [key in Lowercase<T>]: Extract<Component, { kind: Capitalize<key> }>;
};

export interface Entity<T extends Kind = Exclude<Kind, Kind>> {
  id: number;
  spawned: number;
  components: Required<Components<T>> & Partial<Components<Exclude<Kind, T>>>;
  lifespan?: number;
  destroyed: boolean;
  archetype?: Archetype;
}

export class Entity {
  public static isPlayer(entity: Entity) {
    return entity.components.politics?.team === "Player";
  }
}

export class Game {
  private systems: System[];
  public elapsed = 0;
  private lastTime = 0;
  public entities: Entities;
  public state: DeepReadonly<GameState>;

  /**
   * Helpers / utilities / factories.
   */
  public bulletFactory: BulletFactory;
  public spriteFactory: SpriteFactory;
  public shipFactory: ShipFactory;
  public soundFactory: SoundFactory;
  public doodadFactory: DoodadFactory;
  public planetFactory: PlanetFactory;

  /**
   * A replacement for a class constructor so that we can do async stuff on initialization.
   */
  public static async init() {
    const game = new Game();
    game.systems = await Promise.all(SystemCreators.map(async (s) => await s(game)));
    game.bulletFactory = new BulletFactory(game);
    game.spriteFactory = await SpriteFactory.init(game);
    game.shipFactory = new ShipFactory(game);
    game.soundFactory = await SoundFactory.init(game);
    game.doodadFactory = new DoodadFactory(game);
    game.planetFactory = new PlanetFactory(game);
    game.entities = new Entities(game);
    game.state = initialGameState;

    return game;
  }

  /**
   * Set state by providing a function that mutates draft.
   */
  public setState(recipe: (draft: Draft<GameState>) => void) {
    // Double-wrap recipe to ignore if users return a value (we ignore that value).
    this.state = produce(this.state, (draft) => {
      recipe(draft);
    });
  }

  public start() {
    requestAnimationFrame(this.tick.bind(this));
  }

  /**
   * For each system, query all relevant entities based on components, call update on the system for
   * each entity, independently. If a system has no entities to act on, it is not run.
   */
  private tick(timestamp: number) {
    if (this.state.isPaused) {
      this.lastTime = timestamp;
      requestAnimationFrame(this.tick.bind(this));
      return;
    }

    /**
     * We must handle time with an intermediate value, otherwise pausing the game would
     * break things in fun ways as the timestamp kept ticking.
     */
    const delta = timestamp - this.lastTime;
    this.elapsed += delta;
    this.lastTime = timestamp;

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
        if (this.entities.isMatch(e, sys.kindsOrArchetype)) {
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