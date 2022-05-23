import { ammoDefinitions } from "./ammos";
import { shipDefinitions } from "./ships";
import { weaponDefinitions } from "./weapons";

// Every item is one of these. They just describe static properties about the item.
export type ItemDefinition = { label: string };

// Names for every possible item.
export type WeaponType = keyof typeof weaponDefinitions;
export type AmmoType = keyof typeof ammoDefinitions;
export type ShipType = keyof typeof shipDefinitions;
export type ItemType = AmmoType | ShipType | WeaponType;
