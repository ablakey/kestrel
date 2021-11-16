import { Item } from ".";
import blueShip from "../assets/pixel_ship_blue.png";
import redShip from "../assets/pixel_ship_red.png";
import { WeaponName } from "./Weapons";

export type Ship = Item & {
  hp: number;
  texture: string;
  radius: number;
  maxSpeed: number;
  acceleration: number;
  turnRate: number; // rad/sec.
  offsetX: number;
  offsetY: number;
  weapons: WeaponName[];
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
    weapons: ["ProtonCannon"],
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
    weapons: ["LaserCannon"],
  },
};
