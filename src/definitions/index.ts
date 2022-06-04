import { ammoDefinitions } from "./ammos";
import { doodadDefinitions } from "./doodads";
import { shipDefinitions } from "./ships";
import { upgradeDefinitions } from "./upgrades";
import { weaponDefinitions } from "./weapons";

// Every item is one of these. They just describe static properties about the item.
export type BaseDefinition = unknown;
export type ItemDefinition = BaseDefinition & { label: string }; // price, etc.

// Names for every possible item.
export type WeaponName = keyof typeof weaponDefinitions;
export type AmmoName = keyof typeof ammoDefinitions;
export type UpgradeName = keyof typeof upgradeDefinitions;

// Items that can exist in a ship inventory. A ship cannot keep other ships in inventory.
export type ItemName = AmmoName | WeaponName | UpgradeName;

// export type ItemType = "Weapon" | "Ammo" | "Upgrade";

export type Item = { name: ItemName; count: number };

// Other things that aren't inventory items.
export type ShipName = keyof typeof shipDefinitions;
export type DoodadName = keyof typeof doodadDefinitions;
