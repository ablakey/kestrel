import laserTexture from "../assets/sprites/pixel_laser_green.png";
import protonTexture from "../assets/sprites/pixel_laser_blue.png";

import { Item } from ".";
import { SoundName } from "../Utilities/AudioFactory";

export type Weapon = Item & {
  speed: number;
  fireRate: number; // How many bullets per second are fired from this weapon.
  bulletTexture: string;
  damage: number;
  maxRange: number; // range in units this weapon is effective at.  For AI.
  lifespan: number; // ms that bullets weapon this wepaon live for.
  type: "Primary" | "Secondary";
  accuracy: number; // 0-1 where 0 fires in any direction while 1 is always the correct direction.
  sound: SoundName;
};

export type WeaponName = "LaserCannon" | "ProtonCannon";

export const Weapons: Record<WeaponName, Weapon> = {
  LaserCannon: {
    speed: 1_100,
    fireRate: 2,
    bulletTexture: laserTexture,
    damage: 1,
    maxRange: 1_000,
    lifespan: 1_000,
    accuracy: 0.95,
    label: "Laser Cannon",
    type: "Primary",
    sound: "Laser",
  },
  ProtonCannon: {
    label: "Proton Cannon",
    speed: 1_200,
    fireRate: 1.5,
    bulletTexture: protonTexture,
    damage: 5,
    maxRange: 1_000,
    lifespan: 1_000,
    accuracy: 0.95,
    type: "Primary",
    sound: "Proton",
  },
};
