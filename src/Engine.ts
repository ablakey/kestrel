import { Ship } from "./types/Ship";

export class Engine {
  isPaused: boolean;
  lastTick: number;
  elapsed: number;
  ships: Set<Ship>;

  constructor() {
    this.isPaused = false;
    this.lastTick = 0;
    this.elapsed = 0;
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

    this.ships.forEach((e) => {
      this.renderSystem.tick(delta, e);
    });

    this.ships.forEach((e) => {
      if (e.destroyed) {
        this.ships.delete(e);
      }
    });

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
