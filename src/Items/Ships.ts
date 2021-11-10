import { Item } from ".";
import blueShip from "../assets/pixel_ship_blue.png";
import redShip from "../assets/pixel_ship_red.png";

export type Ship = Item & { health: number; texture: string; radius: number };
export type ShipName = "Blue" | "Red";

export const Ships: Record<ShipName, Ship> = {
  Blue: {
    health: 100,
    texture: blueShip,
    label: "Blue Ship",
    radius: 60,
  },
  Red: {
    health: 100,
    texture: redShip,
    label: "Red Ship",
    radius: 60,
  },
};
