import { AmmoName, ItemDefinition } from ".";
import { SoundName } from "../factories/SoundFactory";
import { SpriteName } from "../factories/SpriteFactory";
import { asTypedObject } from "../utils";

export type WeaponDefinition = ItemDefinition & {
  speed: number;
  cooldown: number; // How many seconds between shots.
  sprite: SpriteName;
  damage: number;
  maxRange: number; // range in units this weapon is effective at.  For AI.
  lifespan: number; // ms that bullets weapon this wepaon live for.
  type: "Primary" | "Secondary";
  accuracy: number; // 0-1 where 0 fires in any direction while 1 is always the correct direction.
  sound: SoundName;
  hitSound: SoundName | null;
  turnRate: number;
  ammo: AmmoName | null; // The item, optionally. to consume when firing this weapon.
  dumbfire: boolean; // Weapon can hit something without a target.
  blastRadius: number; // Find other targets for damage. Usuaully 0.
};

export const weaponDefinitions = asTypedObject<WeaponDefinition>()({
  LaserCannon: {
    speed: 1_100,
    cooldown: 2_000,
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
    turnRate: 0,
    dumbfire: true,
    blastRadius: 0,
  },
  ProtonCannon: {
    label: "Proton Cannon",
    speed: 1_200,
    cooldown: 1_500,
    sprite: "Proton",
    damage: 30,
    maxRange: 1_000,
    lifespan: 300,
    accuracy: 0.95,
    type: "Primary",
    sound: "Proton",
    hitSound: null,
    ammo: null,
    turnRate: 0,
    dumbfire: true,
    blastRadius: 0,
  },
  MissileRack: {
    label: "Missile Rack",
    accuracy: 1.0,
    damage: 50,
    cooldown: 500,
    lifespan: 20_000,
    type: "Secondary",
    maxRange: 10_000,
    sound: "Missile",
    sprite: "Missile",
    hitSound: "MediumExplosion",
    speed: 700,
    turnRate: 2,
    ammo: "Missile",
    dumbfire: false,
    blastRadius: 0,
  },
  HeavyLauncher: {
    label: "Heavy Rocket Launcher",
    accuracy: 1.0,
    damage: 150,
    cooldown: 250,
    lifespan: 3_000,
    type: "Secondary",
    maxRange: 3_000,
    sound: "HeavyRocket",
    sprite: "Missile", // TODO
    hitSound: "MediumExplosion",
    speed: 350,
    turnRate: 0,
    ammo: "Rocket",
    dumbfire: true,
    blastRadius: 100,
  },
});

export const primaryWeaponNames = Object.entries(weaponDefinitions)
  .filter(([, d]) => d.type === "Primary")
  .map(([n]) => n);

export const secondaryWeaponNames = Object.entries(weaponDefinitions)
  .filter(([, d]) => d.type === "Secondary")
  .map(([n]) => n);
