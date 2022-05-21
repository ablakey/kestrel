import { EntityManager } from "./EntityManager";
import { SpriteFactory } from "./factories/SpriteFactory";
import { InputSystem } from "./systems/InputSystem";
import { RenderSystem } from "./systems/RenderSystem";

export class Engine {
  isPaused: boolean;
  lastTick: number;
  elapsed: number;
  entities: EntityManager;

  // Factories.
  spriteFactory: SpriteFactory;

  // Systems.
  renderSystem: RenderSystem;
  inputSystem: InputSystem;

  constructor() {
    this.isPaused = false;
    this.lastTick = 0;
    this.elapsed = 0;

    this.entities = new EntityManager();
    this.spriteFactory = new SpriteFactory(this);
    this.renderSystem = new RenderSystem(this);
    this.inputSystem = new InputSystem(this);
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

    this.entities.ships.forEach((e) => {
      this.renderSystem.update(e);
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
