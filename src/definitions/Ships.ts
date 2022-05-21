import { SpriteName } from "../factories/SpriteFactory";

export type ShipDefinition = {
  label: string;
  maxHp: number;
  sprite: SpriteName;
  radius: number;
  maxSpeed: number;
  accelSpeed: number;
  turnRate: number; // rad/sec.
  offsetX: number;
  offsetY: number;
  // weapons: WeaponInstance[];
  // ammos: AmmoInstance[];
  size: ShipSize;
};

export type ShipType = "Blue" | "Red";

export type ShipSize = "Small" | "Normal" | "Large" | "Massive";

export const shipDefinitions: Record<ShipType, ShipDefinition> = {
  Blue: {
    maxHp: 100,
    sprite: "BlueShip",
    label: "Blue Ship",
    radius: 60,
    maxSpeed: 500,
    accelSpeed: 4,
    turnRate: 4,
    offsetX: 0.5,
    offsetY: 0.6,
    size: "Small",
  },
  Red: {
    maxHp: 100,
    sprite: "RedShip",
    label: "Red Ship",
    radius: 60,
    maxSpeed: 500,
    accelSpeed: 4,
    turnRate: 4,
    offsetX: 0.5,
    offsetY: 0.6,
    size: "Small",
  },
};
4;
