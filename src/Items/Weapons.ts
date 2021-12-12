import { Item } from ".";
import { SoundName, SpriteName } from "../resources";

export type Weapon = Item & {
  speed: number;
  fireRate: number; // How many bullets per second are fired from this weapon.
  sprite: SpriteName;
  damage: number;
  maxRange: number; // range in units this weapon is effective at.  For AI.
  lifespan: number; // ms that bullets weapon this wepaon live for.
  type: "Primary" | "Secondary";
  accuracy: number; // 0-1 where 0 fires in any direction while 1 is always the correct direction.
  sound: SoundName;
  trackable: boolean; // Can ammo be tracked on radar?
};

export type WeaponName = "LaserCannon" | "ProtonCannon";

export const Weapons: Record<WeaponName, Weapon> = {
  LaserCannon: {
    speed: 1_100,
    fireRate: 2,
    sprite: "Laser",
    damage: 1,
    maxRange: 1_000,
    lifespan: 1_000,
    accuracy: 0.95,
    label: "Laser Cannon",
    type: "Primary",
    sound: "Laser",
    trackable: false,
  },
  ProtonCannon: {
    label: "Proton Cannon",
    speed: 1_200,
    fireRate: 1.5,
    sprite: "Proton",
    damage: 30,
    maxRange: 1_000,
    lifespan: 1_000,
    accuracy: 0.95,
    type: "Primary",
    sound: "Proton",
    trackable: false,
  },
};
