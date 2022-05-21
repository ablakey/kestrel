import { GameInputs } from "../config";
import { Engine } from "../Engine";
import { assert } from "../utils";
import { System } from "./System";

export class InputSystem extends System {
  private inputQueue: Set<string>;
  private keyState: Record<string, boolean | undefined>;

  constructor(engine: Engine) {
    super(engine);
    this.keyState = {};
    this.inputQueue = new Set();
  }

  playerUpdate() {
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
    } else if (this.keyState[GameInputs.RotateTowards.key] && playerShip.target) {
      const target = this.engine.entities.getShip(playerShip.target);
      assert(target);
      playerShip.turn = playerShip.getTurn(target.position);
    } else if (this.keyState[GameInputs.RotateOpposite.key]) {
      playerShip.turn = playerShip.getOppositeTurn();
    } else {
      playerShip.turn = "None";
    }

    // Thruster
    playerShip.thrust = this.keyState[GameInputs.Thrust.key] ? "Forward" : "None";

    // Weapons
    playerShip.firePrimary = this.keyState[GameInputs.FirePrimary.key] ?? false;
    playerShip.fireSecondary = this.keyState[GameInputs.FireSecondary.key] ?? false;

    /**
     * Handle event keys.
     * Keys as events are triggered once, rather than persisting a state, which get polled.
     */
    this.inputQueue.forEach((k) => {
      this.inputQueue.delete(k);

      switch (k) {
        case GameInputs.NextTarget.key:
          const index = k === GameInputs.NextTarget.key ? 1 : -1;
          playerShip.target = this.engine.entities.getNextTarget(playerShip.target, index);
          // this.engine.sounds.playSound("Beep1");
          break;
        // case GameInputs.SelectSecondary.key:
        //   offensive.selectedSecondary = Inventory.getNextSecondaryWeapon(
        //     entity,
        //     offensive.selectedSecondary
        //   );
        //   break;
        // case GameInputs.ShowDebug.key:
        //   this.engine.setState((draft) => {
        //     draft.isPaused = true;
        //     draft.showDebug = true;
        //   });
        //   break;
        // case GameInputs.showAbout.key:
        //   this.engine.setState((draft) => {
        //     draft.isPaused = true;
        //     draft.showAbout = true;
        //   });
        //   break;
      }
    });
  }
}
