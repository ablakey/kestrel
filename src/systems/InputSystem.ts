import { assert } from "ts-essentials";
import { GameInput } from "../config";
import { Engine } from "../Engine";
import { stringifyFullKey } from "../utils";
import { System } from "./System";

const keysInUse = new Set(Object.values(GameInput).map((k) => k.key));

const inputsByKey = Object.entries(GameInput).reduce((acc, [input, config]) => {
  acc[config.key] = { ...config, input };
  return acc;
}, {} as Record<string, { input: string; asEvent?: boolean; key: string }>);

export class InputSystem extends System {
  private inputQueue: Set<string>;
  private keyState: Record<string, boolean | undefined>;

  constructor(engine: Engine) {
    super(engine);
    this.keyState = {};
    this.inputQueue = new Set();

    document.addEventListener("keyup", (e) => {
      const code = stringifyFullKey(e);

      // Only capture keys that we're using.
      if (!keysInUse.has(code as any)) {
        return;
      }

      if (!inputsByKey[code]?.asEvent) {
        this.keyState[code] = false;
      }

      e.preventDefault();
    });

    document.addEventListener("keydown", (e) => {
      const code = stringifyFullKey(e);

      // Only capture keys that we're using.
      if (!keysInUse.has(code as any)) {
        return;
      }

      if (!inputsByKey[code].asEvent) {
        this.keyState[code] = true;
      } else {
        this.inputQueue.add(code);
      }

      e.preventDefault();
    });
  }

  updatePlayer() {
    if (this.engine.isPaused) {
      this.inputQueue.clear();
      return;
    }

    const playerShip = this.engine.entities.playerShip;

    // Rotate
    if (this.keyState[GameInput.RotateLeft.key]) {
      playerShip.turn = "Left";
    } else if (this.keyState[GameInput.RotateRight.key]) {
      playerShip.turn = "Right";
    } else if (this.keyState[GameInput.RotateTowards.key] && playerShip.target) {
      const target = this.engine.entities.ships.get(playerShip.target);
      assert(target);
      playerShip.turnTowards(target.position);
    } else if (this.keyState[GameInput.RotateOpposite.key]) {
      playerShip.turnAway();
    } else {
      playerShip.turn = "None";
    }

    // Thruster
    playerShip.thrust = this.keyState[GameInput.Thrust.key] ? "Forward" : "None";

    // Weapons
    playerShip.firePrimary = this.keyState[GameInput.FirePrimary.key] ?? false;
    playerShip.fireSecondary = this.keyState[GameInput.FireSecondary.key] ?? false;

    /**
     * Handle event keys.
     * Keys as events are triggered once, rather than persisting a state, which get polled.
     */
    this.inputQueue.forEach((k) => {
      this.inputQueue.delete(k);

      switch (k) {
        case GameInput.NextTarget.key:
          const index = k === GameInput.NextTarget.key ? 1 : -1;
          playerShip.target = this.engine.entities.getNextTarget(playerShip.target, index);
          // this.engine.sounds.playSound("Beep1");
          break;
        // case GameInput.SelectSecondary.key:
        //   offensive.selectedSecondary = Inventory.getNextSecondaryWeapon(
        //     entity,
        //     offensive.selectedSecondary
        //   );
        //   break;
        // case GameInput.ShowDebug.key:
        //   this.engine.setState((draft) => {
        //     draft.isPaused = true;
        //     draft.showDebug = true;
        //   });
        //   break;
        // case GameInput.showAbout.key:
        //   this.engine.setState((draft) => {
        //     draft.isPaused = true;
        //     draft.showAbout = true;
        //   });
        //   break;
      }
    });
  }
}
