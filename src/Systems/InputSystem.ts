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
} as const;

const keysInUse = new Set(Object.values(Inputs).map((k) => k.key));

const inputsByKey = Object.entries(Inputs).reduce((acc, [input, config]) => {
  acc[config.key] = { ...config, input };
  return acc;
}, {} as Record<string, { input: string; asEvent?: boolean; key: string }>);

export const InputSystem = (ecs: ECS): System => {
  const keyState: Record<string, boolean | undefined> = {};
  const inputQueue: Set<string> = new Set(); // Set to avoid multiples of same key.

  document.addEventListener("keyup", (e) => (keyState[e.code] = false));

  document.addEventListener("keydown", (e) => {
    if (!keysInUse.has(e.code as any)) {
      return;
    }

    if (inputsByKey[e.code].asEvent) {
      inputQueue.add(e.code);
    } else {
      keyState[e.code] = true;
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
      if (k === Inputs.NextTarget.key) {
        Offensive.target = ecs.utilities.QueryHelpers.getNextTarget(Offensive.target);
      }
    });
  }

  return { componentKinds: ["Engine", "Offensive", "Player"], update };
};
