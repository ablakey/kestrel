import laserTexture from "../assets/pixel_laser_green.png";
import protonTexture from "../assets/pixel_laser_blue.png";
import { Item } from ".";

export type Weapon = Item & {
  speed: number;
  bulletTexture: string;
  damage: number;
  type: "Primary" | "Secondary";
};

export type WeaponName = "LaserCannon" | "ProtonCannon";

export const Weapons: Record<WeaponName, Weapon> = {
  LaserCannon: {
    speed: 100,
    bulletTexture: laserTexture,
    damage: 0,
    label: "Laser Cannon",
    type: "Primary",
  },
  ProtonCannon: {
    label: "Proton Cannon",
    speed: 100,
    bulletTexture: protonTexture,
    damage: 0,
    type: "Primary",
  },
};
