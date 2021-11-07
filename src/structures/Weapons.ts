import laserTexture from "../assets/pixel_laser_green.png";
import protonTexture from "../assets/pixel_laser_blue.png";

export type Weapon = { speed: number; bulletTexture: string; damage: number };

export enum WeaponName {
  LaserCannon = "LaserCannon",
  ProtonCannon = "ProtonCannon",
}

export const Weapons: Record<WeaponName, Weapon> = {
  LaserCannon: {
    speed: 100,
    bulletTexture: laserTexture,
    damage: 10,
  },
  ProtonCannon: {
    speed: 100,
    bulletTexture: protonTexture,
    damage: 20,
  },
};
