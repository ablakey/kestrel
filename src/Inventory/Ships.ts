import { AmmoInstance, Item, WeaponInstance } from ".";
import { SpriteName } from "../Factories/SpriteFactory";

export type Ship = Item & {
  hp: number;
  sprite: SpriteName;
  radius: number;
  maxSpeed: number;
  accelSpeed: number;
  turnRate: number; // rad/sec.
  offsetX: number;
  offsetY: number;
  weapons: WeaponInstance[];
  ammos: AmmoInstance[];
  size: ShipSize;
};

export type ShipName = "Blue" | "Red";

export type ShipSize = "Small" | "Normal" | "Large" | "Massive";

export const Ships: Record<ShipName, Ship> = {
  Blue: {
    hp: 100,
    sprite: "BlueShip",
    label: "Blue Ship",
    radius: 60,
    maxSpeed: 500,
    accelSpeed: 4,
    turnRate: 4,
    offsetX: 0.5,
    offsetY: 0.6,
    size: "Small",
    ammos: [
      { name: "Missile", count: 30 },
      { name: "Rocket", count: 10 },
    ],
    weapons: [
      { name: "ProtonCannon", count: 2, lastUsed: 0 },
      { name: "MissileRack", lastUsed: 0, count: 2 },
      { name: "HeavyLauncher", lastUsed: 0, count: 1 },
    ],
  },
  Red: {
    hp: 100,
    sprite: "RedShip",
    label: "Red Ship",
    radius: 60,
    maxSpeed: 500,
    accelSpeed: 4,
    turnRate: 4,
    offsetX: 0.5,
    offsetY: 0.6,
    weapons: [{ name: "LaserCannon", count: 1, lastUsed: 0 }],
    ammos: [],
    size: "Small",
  },
};
4;
