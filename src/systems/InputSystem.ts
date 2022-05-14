import { GameInputs } from "../config";
import { Engine } from "../Engine";

export class InputSystem {
  private engine: Engine;
  private inputQueue: Set<string>;
  private keyState: Record<string, boolean | undefined>;

  constructor(engine: Engine) {
    this.engine = engine;
    this.keyState = {};
    this.inputQueue = new Set();
  }

  update(delta: number) {
    if (this.engine.isPaused) {
      this.inputQueue.clear();
      return;
    }

    const playerShip = this.engine.entities.playerShip;

    // Rotate
    if (this.keyState[GameInputs.RotateLeft.key]) {
      playerShip.turn = "Left";
    } else if (this.keyState[GameInputs.RotateRight.key]) {
      playerShip.turn = "Right";
    } else if (this.keyState[GameInputs.RotateTowards.key] && offensive.target) {
      const target = game.entities.get(offensive.target) as ShipEntity;
      assert(target);
      engine.direction = Body.getTurnDirection(body, target.components.body.position);
    } else if (keyState[GameInputs.RotateOpposite.key]) {
      engine.direction = Body.getTurnDirectionForOpposite(body);
    } else {
      engine.direction = "None";
    }

    // Thruster
    engine.thrust = keyState[GameInputs.Thrust.key] ? "Forward" : "None";

    // Weapons
    offensive.firePrimary = keyState[GameInputs.FirePrimary.key] ?? false;
    offensive.fireSecondary = keyState[GameInputs.FireSecondary.key] ?? false;

    /**
     * Handle event keys.
     * Keys as events are triggered once, rather than persisting a state, which get polled.
     */
    inputQueue.forEach((k) => {
      inputQueue.delete(k);

      switch (k) {
        case GameInputs.NextTarget.key:
          const index = k === GameInputs.NextTarget.key ? 1 : -1;
          offensive.target = game.entities.getNextPlayerTarget(offensive.target, index);
          game.soundFactory.playSound("Beep1");
          break;
        case GameInputs.SelectSecondary.key:
          offensive.selectedSecondary = Inventory.getNextSecondaryWeapon(
            entity,
            offensive.selectedSecondary
          );
          break;
        case GameInputs.ShowDebug.key:
          game.setState((draft) => {
            draft.isPaused = true;
            draft.showDebug = true;
          });
          break;
        case GameInputs.showAbout.key:
          game.setState((draft) => {
            draft.isPaused = true;
            draft.showAbout = true;
          });
          break;
      }
    });
  }
}
