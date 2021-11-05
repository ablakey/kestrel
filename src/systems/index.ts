import { BulletSystem } from "./BulletSystem";
import { EngineSystem } from "./EngineSystem";
import { InputSystem } from "./InputSystem";
import { MovementSystem } from "./MovementSystem";
import { RenderSystem } from "./RenderSystem";
import { StatsSystem } from "./StatsSystem";
import { WeaponSystem } from "./WeaponSystem";

// Order matters.
export const systems = [
  InputSystem,
  EngineSystem,
  MovementSystem,
  WeaponSystem,
  BulletSystem,
  StatsSystem,
  RenderSystem,
];
