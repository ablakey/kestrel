import { Howl } from "howler";
import Victor from "victor";
import { SoundName, Sounds } from "../resources";
import { BaseUtility } from "./BaseUtility";

const POSITION_SCALE = 0.1; // Adjust to affect how distance plays a role in sound.
const GLOBAL_VOLUME = 0.5;

export class AudioFactory extends BaseUtility {
  public playSound(soundName: SoundName, opts?: { position: Victor }) {
    const sound = new Howl({
      src: [Sounds[soundName]],
      volume: GLOBAL_VOLUME,
      // html5: true,
    });

    /**
     * Calculate position.
     * If within a threshold, just play centred.
     */
    if (opts?.position) {
      const playerPosition = this.ecs.getPlayer().components.Body.position;
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
