import { BaseUtility } from "./BaseUtility";
import * as PIXI from "pixi.js";

// Sprites
import laserSprite from "../assets/sprites/pixel_laser_green.png";
import protonSprite from "../assets/sprites/pixel_laser_blue.png";
import blueShipSprite from "../assets/sprites/pixel_ship_blue.png";
import redShipSprite from "../assets/sprites/pixel_ship_red.png";

// Spritesheets
import explosionSheetData from "../assets/spritesheets/explosion.json";
import explosionSheet from "../assets/spritesheets/explosion.png";

export type SpriteName = "Laser" | "Explosion" | "BlueShip" | "RedShip" | "Proton";

type StaticSprite = { image: string; type: "static" };
type AnimatedSprite = { type: "animated"; image: string; data: any; animationSpeed: number };

const spriteData: Record<SpriteName, StaticSprite | AnimatedSprite> = {
  Laser: { type: "static", image: laserSprite },
  Proton: { type: "static", image: protonSprite },
  BlueShip: { type: "static", image: blueShipSprite },
  RedShip: { type: "static", image: redShipSprite },
  Explosion: {
    type: "animated",
    image: explosionSheet,
    data: explosionSheetData,
    animationSpeed: 1,
  },
};

export class SpriteFactory extends BaseUtility {
  private createStaticSprite(sprite: StaticSprite): PIXI.Sprite {
    const pixiSprite = PIXI.Sprite.from(sprite.image);
    pixiSprite.anchor.set(0.5, 0.5);
    return pixiSprite;
  }

  private createAnimatedSprite(sprite: AnimatedSprite): PIXI.AnimatedSprite {
    const pixiTexture = PIXI.Texture.from(sprite.image);
    const pixiSpritesheet = new PIXI.Spritesheet(pixiTexture, sprite.data);
    pixiSpritesheet.textures;

    // TODO: this probably does not guarantee in-order sprites.
    const pixiSprite = new PIXI.AnimatedSprite(Object.values(pixiSpritesheet.textures));
    pixiSprite.animationSpeed = sprite.animationSpeed;

    return pixiSprite;
  }

  createSprite(name: SpriteName): PIXI.Sprite | PIXI.AnimatedSprite {
    const s = spriteData[name];

    return s.type === "static" ? this.createStaticSprite(s) : this.createAnimatedSprite(s);
  }
}
