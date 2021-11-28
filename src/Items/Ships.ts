import { Item, WeaponInstance } from ".";
import blueShip from "../assets/sprites/pixel_ship_blue.png";
import redShip from "../assets/sprites/pixel_ship_red.png";

export type Ship = Item & {
  hp: number;
  texture: string;
  radius: number;
  maxSpeed: number;
  acceleration: number;
  turnRate: number; // rad/sec.
  offsetX: number;
  offsetY: number;
  weapons: WeaponInstance[];
};

export type ShipName = "Blue" | "Red";

export const Ships: Record<ShipName, Ship> = {
  Blue: {
    hp: 100,
    texture: blueShip,
    label: "Blue Ship",
    radius: 60,
    maxSpeed: 500,
    acceleration: 200,
    turnRate: 4,
    offsetX: 0.5,
    offsetY: 0.6,
    weapons: [{ name: "ProtonCannon", count: 2, lastUsed: 0 }],
  },
  Red: {
    hp: 100,
    texture: redShip,
    label: "Red Ship",
    radius: 60,
    maxSpeed: 500,
    acceleration: 200,
    turnRate: 4,
    offsetX: 0.5,
    offsetY: 0.6,
    weapons: [
      { name: "LaserCannon", count: 1, lastUsed: 0 },
      { name: "ProtonCannon", lastUsed: 0, count: 1 },
    ],
  },
};
4;
