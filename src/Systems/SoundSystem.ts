import { Howl } from "howler";
import { ECS, System } from "../ecs";
import { events, SpawnEvent } from "../events";

const POSITION_SCALE = 0.1; // Adjust to affect how distance plays a role in sound.
const DISTANCE_THRESHOLD = 100; // If the sound is this close to the player, don't do any positional audio effects.

export const SoundSystem = (ecs: ECS): System => {
  function handleEvents(event: SpawnEvent) {
    if (event.sound === undefined) {
      return;
    }

    const sound = new Howl({
      src: [event.sound],
      volume: 0.25,
      // html5: true,
    });

    /**
     * Calculate position.
     * If within a threshold, just play centred.
     */

    const playerPosition = ecs.getPlayer().components.Body.position;
    const soundDistance = event.position.distance(playerPosition);
    const soundPosition = event.position.clone().subtract(playerPosition);

    if (soundDistance > DISTANCE_THRESHOLD) {
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

  events.on("spawn", handleEvents);

  return { componentKinds: [] };
};
