// Sounds
import laserSound from "./assets/sounds/laser.mp3";
import protonSound from "./assets/sounds/proton.mp3";
import beepSound from "./assets/sounds/beep.mp3";

// Spritesheets
// import explosionSheetData from "./assets/spritesheets/explosion.json";
// import explosionSheet from "./assets/spritesheets/explosion.png";

// export const Spritesheets = {
//   Explosion: { data: explosionSheetData, sheet: explosionSheet },
// };

// export type SpritesheetName = keyof typeof Spritesheets;

export const Sounds = {
  Laser: laserSound,
  Proton: protonSound,
  Beep1: beepSound,
};

export type SoundName = keyof typeof Sounds;
