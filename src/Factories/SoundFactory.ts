import { Howl } from "howler";
import Victor from "victor";
import { BaseFactory } from "./BaseFactory";

import sounds from "../assets/sounds/*.mp3";

const POSITION_SCALE = 0.1; // Adjust to affect how distance plays a role in sound.
const GLOBAL_VOLUME_ADJUST = 0.1; // Volume at 1.0 is way too loud.

export const Sounds = {
  Laser: sounds.laser,
  Proton: sounds.proton,
  Beep1: sounds.beep,
  ShipBreaksUp: sounds.shipbreaksup,
  ShipExplodes: sounds.shipexplodes,
};

export type SoundName = keyof typeof Sounds;

export class SoundFactory extends BaseFactory {
  public playSound(soundName: SoundName, opts?: { position: Victor }) {
    const sound = new Howl({
      src: [Sounds[soundName]],
      volume: this.game.state.volume * GLOBAL_VOLUME_ADJUST,
      // html5: true,
    });

    /**
     * Calculate position.
     */
    if (opts?.position) {
      const playerPosition = this.game.getPlayer().components.body.position;
      const soundPosition = opts.position.clone().subtract(playerPosition);

      sound.pos(soundPosition.x * POSITION_SCALE, soundPosition.y * POSITION_SCALE, 0);
      sound.pannerAttr({
        distanceModel: "linear",
        maxDistance: 10000,
        panningModel: "HRTF",
        refDistance: 1,
        rolloffFactor: 1,
      });
    }

    sound.play();
  }
}
