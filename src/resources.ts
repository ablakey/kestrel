import laserSound from "./assets/sounds/laser.mp3";
import protonSound from "./assets/sounds/proton.mp3";
import beepSound from "./assets/sounds/beep.mp3";

// Sprites
import laserSprite from "./assets/sprites/pixel_laser_green.png";
import protonSprite from "./assets/sprites/pixel_laser_blue.png";
import blueShip from "./assets/sprites/pixel_ship_blue.png";
import redShip from "./assets/sprites/pixel_ship_red.png";

export const Sprites = {
  Laser: laserSprite,
  Proton: protonSprite,
  BlueShip: blueShip,
  RedShip: redShip,
};

export type SpriteName = keyof typeof Sprites;

export const Sounds = {
  Laser: laserSound,
  Proton: protonSound,
  Beep1: beepSound,
};

export type SoundName = keyof typeof Sounds;
