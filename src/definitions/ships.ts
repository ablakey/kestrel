import { Item, ItemDefinition } from ".";
import { SpriteName } from "../factories/SpriteFactory";
import { Size } from "../entities/Ship";
import { asTypedObject } from "../utils";

export type ShipDefinition = ItemDefinition & {
  label: string;
  maxHp: number;
  sprite: SpriteName;
  radius: number;
  maxSpeed: number;
  accelSpeed: number;
  turnRate: number; // rad/sec.
  offsetX: number;
  offsetY: number;
  startingItems: Item[];
  size: Size;
};

export const shipDefinitions = asTypedObject<ShipDefinition>()({
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
    startingItems: [{ name: "ProtonCannon", count: 2 }],
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
    startingItems: [],
  },
});
