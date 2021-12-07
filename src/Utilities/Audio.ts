import { Howl } from "howler";
import Victor from "victor";
import { SoundName, Sounds } from "../resources";
import { BaseUtility } from "./BaseUtility";

const POSITION_SCALE = 0.1; // Adjust to affect how distance plays a role in sound.
const GLOBAL_VOLUME_ADJUST = 0.5; // Volume at 1.0 is way too loud.

export class Audio extends BaseUtility {
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
      const playerPosition = this.game.getPlayer().components.Body.position;
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
