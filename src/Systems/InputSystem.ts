import { ECS, Entity, System } from "../ecs";
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
} as const;

const keysInUse = new Set(Object.values(Inputs).map((k) => k.key));

const inputsByKey = Object.entries(Inputs).reduce((acc, [input, config]) => {
  acc[config.key] = { ...config, input };
  return acc;
}, {} as Record<string, { input: string; asEvent?: boolean; key: string }>);

function parseFullKey(e: KeyboardEvent): string {
  return `${e.altKey ? "Alt" : ""}${e.ctrlKey ? "Ctrl" : ""}${e.shiftKey ? "Shift" : ""}${e.code}`;
}

export const InputSystem = (ecs: ECS): System => {
  const keyState: Record<string, boolean | undefined> = {};
  const inputQueue: Set<string> = new Set(); // Set to avoid multiples of same key.

  document.addEventListener("keyup", (e) => (keyState[parseFullKey(e)] = false));

  document.addEventListener("keydown", (e) => {
    const code = parseFullKey(e);
    if (!keysInUse.has(code as any)) {
      return;
    }

    if (inputsByKey[code].asEvent) {
      inputQueue.add(code);
    } else {
      keyState[code] = true;
    }

    e.preventDefault();
  });

  function update(entity: Entity<"Engine" | "Offensive" | "Player">) {
    const { Engine, Offensive } = entity.components;

    // Rotate
    if (keyState[Inputs.RotateLeft.key]) {
      Engine.direction = Direction.Left;
    } else if (keyState[Inputs.RotateRight.key]) {
      Engine.direction = Direction.Right;
    } else {
      Engine.direction = Direction.None;
    }

    // Thruster
    Engine.thrust = keyState[Inputs.Thrust.key] ? Thrust.Forward : Thrust.None;

    // Armament
    Offensive.primaryFire = keyState[Inputs.FirePrimary.key] ?? false;

    inputQueue.forEach((k) => {
      inputQueue.delete(k);

      // Target
      if ([Inputs.NextTarget.key, Inputs.PreviousTarget.key].includes(k as any)) {
        const index = k === Inputs.NextTarget.key ? 1 : -1;
        Offensive.target = ecs.entities.getTarget(Offensive.target, index);
        ecs.audio.playSound("Beep1");
      }
    });
  }

  return { componentKinds: ["Engine", "Offensive", "Player"], update };
};
