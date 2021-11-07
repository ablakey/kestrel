import laserTexture from "./assets/pixel_laser_green.png";
import protonTexture from "./assets/pixel_laser_blue.png";

export type Item = { name: string };
export type Weapon = Item & {
  speed: number;
  bulletTexture: string;
  damage: number;
  type: "Primary" | "Secondary";
};

export type WeaponName = "LaserCannon" | "ProtonCannon";
export type ItemName = WeaponName;

export const Weapons: Record<WeaponName, Weapon> = {
  LaserCannon: {
    speed: 100,
    bulletTexture: laserTexture,
    damage: 10,
    name: "Laser Cannon",
    type: "Primary",
  },
  ProtonCannon: {
    name: "Proton Cannon",
    speed: 100,
    bulletTexture: protonTexture,
    damage: 20,
    type: "Primary",
  },
};

export const Items: Record<ItemName, Item> = Weapons;
