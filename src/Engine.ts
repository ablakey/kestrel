import { EntityManager } from "./EntityManager";
import { SoundFactory } from "./factories/SoundFactory";
import { SpriteFactory } from "./factories/SpriteFactory";
import { BulletSystem } from "./systems/BulletSystem";
import { CleanupSystem } from "./systems/CleanupSystem";
import { CombatSystem } from "./systems/CombatSystem";
import { EffectsSystem } from "./systems/EffectsSystem";
import { EngineSystem } from "./systems/EngineSystem";
import { InputSystem } from "./systems/InputSystem";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { RenderSystem } from "./systems/RenderSystem";

export class Engine {
  isPaused: boolean;
  lastTick: number;
  elapsed: number;
  entities: EntityManager;
  volume: number;

  // TODO: Game state should be in a .state object.
  //But overall things not related to the game (like volume) aren't.

  // Factories.
  spriteFactory: SpriteFactory;
  soundFactory: SoundFactory;

  // Systems.
  renderSystem: RenderSystem;
  inputSystem: InputSystem;
  physicsSystem: PhysicsSystem;
  engineSystem: EngineSystem;
  cleanupSystem: CleanupSystem;
  combatSystem: CombatSystem;
  effectsSystem: EffectsSystem;
  bulletSystem: BulletSystem;

  constructor() {
    this.isPaused = false;
    this.lastTick = 0;
    this.elapsed = 0;
    this.volume = 0.5; // TODO from config.

    this.entities = new EntityManager();

    this.spriteFactory = new SpriteFactory(this);
    this.soundFactory = new SoundFactory(this);

    this.renderSystem = new RenderSystem(this);
    this.inputSystem = new InputSystem(this);
    this.physicsSystem = new PhysicsSystem(this);
    this.engineSystem = new EngineSystem(this);
    this.cleanupSystem = new CleanupSystem(this);
    this.combatSystem = new CombatSystem(this);
    this.effectsSystem = new EffectsSystem(this);
    this.bulletSystem = new BulletSystem(this);
  }

  async initialize() {
    await this.soundFactory.prefetchSounds();
  }

  start() {
    requestAnimationFrame(this.tick.bind(this));
  }

  private tick(timestamp: number) {
    if (this.isPaused) {
      this.lastTick = timestamp;
      requestAnimationFrame(this.tick.bind(this));
      return;
    }

    /**
     * We must handle time with an intermediate value, otherwise pausing the game would
     * break things in fun ways as the timestamp kept ticking.
     */
    const delta = timestamp - this.lastTick;
    this.elapsed += delta;
    this.lastTick = timestamp;

    const entities = [...this.entities.entities.values()];
    const ships = [...this.entities.ships.values()];
    const bullets = [...this.entities.bullets.values()];
    const doodads = [...this.entities.doodads.values()];

    const shipsBullets = [...ships, ...bullets];

    // Cleanup system must be done first so that other systems can clean up
    // internal state in response. eg. a bullet is now destroyed = true so the
    // RenderSystem will want to delete the sprite.
    ships.forEach((e) => this.cleanupSystem.updateShip(e, delta));
    [...bullets, ...doodads].forEach((e) => this.cleanupSystem.update(e, delta));

    // Player-only updates.
    this.renderSystem.updatePlayer();
    this.inputSystem.updatePlayer();

    // System updates for many entities. Order matters.
    ships.forEach((e) => this.engineSystem.update(e));
    shipsBullets.forEach((e) => this.physicsSystem.update(e, delta));
    ships.forEach((e) => this.combatSystem.update(e));
    bullets.forEach((e) => this.bulletSystem.update(e, delta));
    entities.forEach((e) => this.renderSystem.update(e));
    ships.forEach((e) => this.effectsSystem.update(e, delta));
    this.entities.clearDestroyed();

    requestAnimationFrame(this.tick.bind(this));
  }
}
