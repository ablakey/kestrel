import { AmmosInstance, Item, WeaponInstance } from ".";
import { SpriteName } from "../Factories/SpriteFactory";

export type Ship = Item & {
  hp: number;
  sprite: SpriteName;
  radius: number;
  maxSpeed: number;
  acceleration: number;
  turnRate: number; // rad/sec.
  offsetX: number;
  offsetY: number;
  weapons: WeaponInstance[];
  ammos: AmmosInstance[];
};

export type ShipName = "Blue" | "Red";

export const Ships: Record<ShipName, Ship> = {
  Blue: {
    hp: 100,
    sprite: "BlueShip",
    label: "Blue Ship",
    radius: 60,
    maxSpeed: 500,
    acceleration: 200,
    turnRate: 4,
    offsetX: 0.5,
    offsetY: 0.6,
    ammos: [{ name: "Missile", count: 3 }],
    weapons: [
      { name: "ProtonCannon", count: 2, lastUsed: 0 },
      { name: "MissileRack", lastUsed: 0, count: 1 },
    ],
  },
  Red: {
    hp: 100,
    sprite: "RedShip",
    label: "Red Ship",
    radius: 60,
    maxSpeed: 500,
    acceleration: 200,
    turnRate: 4,
    offsetX: 0.5,
    offsetY: 0.6,
    weapons: [{ name: "LaserCannon", count: 1, lastUsed: 0 }],
    ammos: [],
  },
};
4;
