import { AmmoName, Ammos } from "./Ammos";
import { PlanetName, Planets } from "./Planets";
import { ShipName, Ships } from "./Ships";
import { WeaponName, Weapons } from "./Weapons";

export type Item = { label: string };

export type ItemName = WeaponName | ShipName | AmmoName | PlanetName;

export const Items: Record<ItemName, Item> = { ...Weapons, ...Ships, ...Planets, ...Ammos };

export type ItemInstance = { name: ItemName; count: number };
export type WeaponInstance = ItemInstance & { name: WeaponName; lastUsed: number };
export type AmmosInstance = ItemInstance & { name: AmmoName };
