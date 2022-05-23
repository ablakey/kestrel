import { EntityManager } from "./EntityManager";
import { SoundFactory } from "./factories/SoundFactory";
import { SpriteFactory } from "./factories/SpriteFactory";
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

  // TODO: Game state should be in a .state object.  But overall things not related to the game (like volume) aren't.

  // Factories.
  spriteFactory: SpriteFactory;
  soundFactory: SoundFactory;

  // Systems.
  renderSystem: RenderSystem;
  inputSystem: InputSystem;
  physicsSystem: PhysicsSystem;
  engineSystem: EngineSystem;

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

    this.renderSystem.playerUpdate();
    this.inputSystem.playerUpdate();

    this.entities.ships.forEach((ship) => {
      this.engineSystem.update(ship);
      this.physicsSystem.update(ship, delta);
      this.renderSystem.update(ship);
    });

    this.entities.clearDestroyed();

    requestAnimationFrame(this.tick.bind(this));
  }
}

/**
 * A loop for all systems.
 * A mutable store for components:
 * - ships
 * - planets
 * - bullets
 * - etc.
 *
 */
