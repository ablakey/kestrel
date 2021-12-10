import { Game, Entity, System } from "../game";
import { Direction, Thrust } from "../enum";

const Inputs = {
  // Movement.
  Thrust: { key: "KeyW" },
  RotateLeft: { key: "KeyA" },
  RotateRight: { key: "KeyD" },

  // Attack.
  FirePrimary: { key: "Space" },

  // Targeting.
  NextTarget: { key: "Tab", asEvent: true },
  PreviousTarget: { key: "ShiftTab", asEvent: true },

  // UI
  ToggleDebugModal: { key: "KeyI", asEvent: true },
} as const;

const keysInUse = new Set(Object.values(Inputs).map((k) => k.key));

const inputsByKey = Object.entries(Inputs).reduce((acc, [input, config]) => {
  acc[config.key] = { ...config, input };
  return acc;
}, {} as Record<string, { input: string; asEvent?: boolean; key: string }>);

function parseFullKey(e: KeyboardEvent): string {
  return `${e.altKey ? "Alt" : ""}${e.ctrlKey ? "Ctrl" : ""}${e.shiftKey ? "Shift" : ""}${e.code}`;
}

export const InputSystem = (game: Game): System => {
  const keyState: Record<string, boolean | undefined> = {};
  const inputQueue: Set<string> = new Set(); // Set to avoid multiples of same key.

  document.addEventListener("keyup", (e) => {
    const code = parseFullKey(e);

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
    const code = parseFullKey(e);

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
    if (keyState[Inputs.RotateLeft.key]) {
      engine.direction = Direction.Left;
    } else if (keyState[Inputs.RotateRight.key]) {
      engine.direction = Direction.Right;
    } else {
      engine.direction = Direction.None;
    }

    // Thruster
    engine.thrust = keyState[Inputs.Thrust.key] ? Thrust.Forward : Thrust.None;

    // Armament
    offensive.primaryFire = keyState[Inputs.FirePrimary.key] ?? false;

    /**
     * Handle event keys.
     * Keys as events are triggered once, rather than persisting a state, which get polled.
     */
    inputQueue.forEach((k) => {
      inputQueue.delete(k);

      switch (k) {
        case Inputs.NextTarget.key:
        case Inputs.PreviousTarget.key:
          const index = k === Inputs.NextTarget.key ? 1 : -1;
          offensive.target = game.entities.getTarget(offensive.target, index);
          game.audio.playSound("Beep1");
          break;
        case Inputs.ToggleDebugModal.key:
          game.state.showDebug = !game.state.showDebug;
          game.state.isPaused = !game.state.isPaused;
          break;
      }
    });
  }

  return { componentKinds: ["Engine", "Offensive", "Player"], update };
};
