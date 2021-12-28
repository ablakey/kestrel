import { Howl } from "howler";
import Victor from "victor";
import { BaseFactory } from "./BaseFactory";

import laser from "../assets/sounds/laser.mp3";
import proton from "../assets/sounds/proton.mp3";
import beep from "../assets/sounds/beep.mp3";
import shipbreaksup from "../assets/sounds/shipbreaksup.mp3";
import shipexplodes from "../assets/sounds/shipexplodes.mp3";
import missile from "../assets/sounds/missile.mp3";
import { Game } from "../game";

const POSITION_SCALE = 0.1; // Adjust to affect how distance plays a role in sound.
const GLOBAL_VOLUME_ADJUST = 0.1; // Volume at 1.0 is way too loud.

const soundUrls = {
  Laser: laser,
  Proton: proton,
  Beep1: beep,
  ShipBreaksUp: shipbreaksup,
  ShipExplodes: shipexplodes,
  Missile: missile,
};

export type SoundName = keyof typeof soundUrls;

export class SoundFactory extends BaseFactory {
  public static async init(game: Game) {
    const self = new SoundFactory(game);

    // Prefetch sounds. Howl will load the URL the moment this is instantiated. Then it is cached inside Howl's
    // internals. We prefetch to avoid a case where the first use of a sound is not possible as it's been acquired.
    await Promise.all(
      Object.values(soundUrls).map((url) => {
        return new Promise<void>((res) => {
          new Howl({
            src: [url],
            onload: () => res(),
          });
        });
      })
    );

    return self;
  }

  public playSound(soundName: SoundName, opts?: { position: Victor }) {
    const sound = new Howl({
      src: [soundUrls[soundName]],
      volume: this.game.state.volume * GLOBAL_VOLUME_ADJUST,
    });

    sound.volume(this.game.state.volume * GLOBAL_VOLUME_ADJUST);
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
