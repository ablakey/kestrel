import { Scene } from "phaser";
import shipBlue from "../assets/pixel_ship_blue.png";

export class SpaceScene extends Scene {
  preload() {
    this.load.image("ship:blue", shipBlue);
  }

  create() {
    const particles = this.add.particles("ship:blue");

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}
