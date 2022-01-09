import { AmmoName } from "./Ammos";
import { ShipName } from "./Ships";
import { WeaponName } from "./Weapons";

export type Item = { label: string };

type ItemName = WeaponName | ShipName | AmmoName;

export type ItemInstance = { name: ItemName; count: number };
export type WeaponInstance = ItemInstance & { name: WeaponName; lastUsed: number };
export type AmmoInstance = ItemInstance & { name: AmmoName };
