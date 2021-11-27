import laserTexture from "../assets/pixel_laser_green.png";
import protonTexture from "../assets/pixel_laser_blue.png";
import { Item } from ".";

export type Weapon = Item & {
  speed: number;
  fireRate: number; // How many bullets per second are fired from this weapon.
  bulletTexture: string;
  damage: number;
  maxRange: number; // range in units this weapon is effective at.  For AI.
  lifespan: number; // ms that bullets weapon this wepaon live for.
  type: "Primary" | "Secondary";
};

export type WeaponName = "LaserCannon" | "ProtonCannon";

export const Weapons: Record<WeaponName, Weapon> = {
  LaserCannon: {
    speed: 1_200,
    fireRate: 3,
    bulletTexture: laserTexture,
    damage: 1,
    maxRange: 1_000,
    lifespan: 1_000,
    label: "Laser Cannon",
    type: "Primary",
  },
  ProtonCannon: {
    label: "Proton Cannon",
    speed: 1_200,
    fireRate: 3,
    bulletTexture: protonTexture,
    damage: 5,
    maxRange: 1_000,
    lifespan: 1_000,
    type: "Primary",
  },
};
