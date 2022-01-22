import { Item } from ".";
import { SoundName } from "../Factories/SoundFactory";
import { SpriteName } from "../Factories/SpriteFactory";
import { AmmoName } from "./Ammos";

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
  hitSound: SoundName | null;
  turnRate: number | null;
  ammo: AmmoName | null; // The item, optionally. to consume when firing this weapon.
};

export type WeaponName = "LaserCannon" | "ProtonCannon" | "MissileRack";

export const Weapons: Record<WeaponName, Weapon> = {
  LaserCannon: {
    speed: 1_100,
    fireRate: 2,
    sprite: "Laser",
    damage: 5,
    maxRange: 1_000,
    lifespan: 1_000,
    accuracy: 0.95,
    label: "Laser Cannon",
    type: "Primary",
    sound: "Laser",
    hitSound: null,
    ammo: null,
    turnRate: null,
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
    hitSound: null,
    ammo: null,
    turnRate: null,
  },
  MissileRack: {
    label: "Missile Rack",
    accuracy: 1.0,
    damage: 50,
    fireRate: 0.5,
    lifespan: 20_000,
    type: "Secondary",
    maxRange: 10_000,
    sound: "Missile",
    sprite: "Missile",
    hitSound: "MediumExplosion",
    speed: 700,
    turnRate: 2,
    ammo: "Missile",
  },
};
