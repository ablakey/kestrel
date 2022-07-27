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
import { BehaviourSystem } from "./systems/BehaviourSystem";
import { StrategySystem } from "./systems/StrategySystem";

export class Engine {
  isPaused: boolean;
  lastTick: number;
  elapsed: number;
  delta: number;
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
  BehaviourSystem: BehaviourSystem;
  strategySystem: StrategySystem;

  constructor() {
    this.isPaused = false;
    this.lastTick = 0;
    this.elapsed = 0;
    this.delta = 0;
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
    this.BehaviourSystem = new BehaviourSystem(this);
    this.strategySystem = new StrategySystem(this);
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
    this.delta = timestamp - this.lastTick;
    this.elapsed += this.delta;
    this.lastTick = timestamp;

    // Cleanup system must be done first so that other systems can clean up
    // internal state in response. eg. a bullet is now destroyed = true so the
    // RenderSystem will want to delete the sprite.
    this.cleanupSystem.update();

    // Player-only updates.
    this.renderSystem.updatePlayer();
    this.inputSystem.updatePlayer();

    // System updates for many entities. Order matters.
    this.strategySystem.update();
    this.BehaviourSystem.update();
    this.engineSystem.update();
    this.physicsSystem.update();
    this.combatSystem.update();
    this.bulletSystem.update();
    this.renderSystem.update();
    this.effectsSystem.update();

    this.entities.clearDestroyed();

    requestAnimationFrame(this.tick.bind(this));
  }
}
