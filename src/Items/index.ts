import { Planets } from "./Planets";
import { ShipName, Ships } from "./Ships";
import { WeaponName, Weapons } from "./Weapons";

export type Item = { label: string };

export type ItemName = WeaponName | ShipName;

export const Items: Record<ItemName, Item> = { ...Weapons, ...Ships, ...Planets };

export type ItemInstance = { name: ItemName; count: number };
export type WeaponInstance = ItemInstance & { name: WeaponName; lastUsed: number };
