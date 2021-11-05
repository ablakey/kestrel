import { BulletSystem } from "./BulletSystem";
import { EngineSystem } from "./EngineSystem";
import { InputSystem } from "./InputSystem";
import { MovementSystem } from "./MovementSystem";
import { RenderSystem } from "./RenderSystem";
import { WeaponSystem } from "./WeaponSystem";

// Order matters.
export const systems = [
  InputSystem,
  EngineSystem,
  MovementSystem,
  WeaponSystem,
  BulletSystem,
  RenderSystem,
];
