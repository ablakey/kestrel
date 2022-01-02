import { Game, Entity, System } from "../game";
import { Direction, Thrust } from "../enum";
import { stringifyFullKey } from "../utils";
import { GameInputs } from "../config";

const keysInUse = new Set(Object.values(GameInputs).map((k) => k.key));

const inputsByKey = Object.entries(GameInputs).reduce((acc, [input, config]) => {
  acc[config.key] = { ...config, input };
  return acc;
}, {} as Record<string, { input: string; asEvent?: boolean; key: string }>);

export const InputSystem = (game: Game): System => {
  const keyState: Record<string, boolean | undefined> = {};
  const inputQueue: Set<string> = new Set(); // Set to avoid multiples of same key.

  document.addEventListener("keyup", (e) => {
    const code = stringifyFullKey(e);

    // Only capture keys that we're using.
    if (!keysInUse.has(code as any)) {
      return;
    }

    if (!inputsByKey[code]?.asEvent) {
      keyState[code] = false;
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
      keyState[code] = true;
    } else {
      inputQueue.add(code);
    }

    e.preventDefault();
  });

  function update(entity: Entity<"Engine" | "Offensive" | "Player">) {
    if (game.state.isPaused) {
      inputQueue.clear();
      return;
    }

    const { engine, offensive } = entity.components;

    // Rotate
    if (keyState[GameInputs.RotateLeft.key]) {
      engine.direction = Direction.Left;
    } else if (keyState[GameInputs.RotateRight.key]) {
      engine.direction = Direction.Right;
    } else {
      engine.direction = Direction.None;
    }

    // Thruster
    engine.thrust = keyState[GameInputs.Thrust.key] ? Thrust.Forward : Thrust.None;

    // Armament
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
          offensive.target = game.entities.getTarget(offensive.target, index);
          game.soundFactory.playSound("Beep1");
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

  return { kindsOrArchetype: ["Engine", "Offensive", "Player"], update };
};
