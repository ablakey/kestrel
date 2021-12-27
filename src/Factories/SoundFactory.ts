import { Howl } from "howler";
import Victor from "victor";
import { BaseFactory } from "./BaseFactory";

import laser from "../assets/sounds/laser.mp3";
import proton from "../assets/sounds/proton.mp3";
import beep from "../assets/sounds/beep.mp3";
import shipbreaksup from "../assets/sounds/shipbreaksup.mp3";
import shipexplodes from "../assets/sounds/shipexplodes.mp3";
import missile from "../assets/sounds/missile.mp3";

const POSITION_SCALE = 0.1; // Adjust to affect how distance plays a role in sound.
const GLOBAL_VOLUME_ADJUST = 0.1; // Volume at 1.0 is way too loud.

export const Sounds = {
  Laser: laser,
  Proton: proton,
  Beep1: beep,
  ShipBreaksUp: shipbreaksup,
  ShipExplodes: shipexplodes,
  Missile: missile,
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
