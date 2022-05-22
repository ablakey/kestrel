// Every item is one of these. They just describe static properties about the item.
export type ItemDefinition = { label: string };

// Names for every possible item.
export type WeaponType = "LaserCannon" | "ProtonCannon" | "MissileRack" | "HeavyLauncher";
export type AmmoType = "Missile" | "Javelin" | "Rocket";
export type ShipType = "Blue" | "Red";
export type ItemType = AmmoType | ShipType | WeaponType;
