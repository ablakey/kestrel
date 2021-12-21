import { BaseFactory } from "./BaseFactory";
import * as PIXI from "pixi.js";

// Sprites
import laserSprite from "../assets/sprites/pixel_laser_green.png";
import protonSprite from "../assets/sprites/pixel_laser_blue.png";
import blueShipSprite from "../assets/sprites/pixel_ship_blue.png";
import redShipSprite from "../assets/sprites/pixel_ship_red.png";

// Spritesheets
import explosionSheetData from "../assets/spritesheets/explosion.json";
import explosionSheet from "../assets/spritesheets/explosion.png";
import { Game } from "../game";

const staticSpriteData = {
  Laser: { image: laserSprite },
  Proton: { image: protonSprite },
  BlueShip: { image: blueShipSprite },
  RedShip: { image: redShipSprite },
} as const;

const spritesheets = {
  explosion: {
    image: explosionSheet,
    data: explosionSheetData,
  },
} as const;

type SpritesheetName = keyof typeof spritesheets;

const animatedSpriteData = {
  Explosion: {
    sheet: "explosion",
    animationSpeed: 0.2,
    scale: 2,
  },
  SmallExplosion: {
    sheet: "explosion",
    animationSpeed: 0.2,
    scale: 1,
  },
} as const;

type StaticSpriteName = keyof typeof staticSpriteData;
type AnimatedSpriteName = keyof typeof animatedSpriteData;
export type SpriteName = StaticSpriteName | AnimatedSpriteName;

type PixiSpritesheets = Record<keyof typeof spritesheets, PIXI.Spritesheet>;

export class SpriteFactory extends BaseFactory {
  private spritesheets: PixiSpritesheets;

  public static async init(game: Game) {
    const self = new SpriteFactory(game);
    self.spritesheets = await self.prepareSpritesheets();
    return self;
  }

  public isAnimated(name: SpriteName) {
    return name in animatedSpriteData;
  }

  public createSprite(name: SpriteName): PIXI.Sprite | PIXI.AnimatedSprite {
    if (name in staticSpriteData) {
      return this.createStaticSprite(name as StaticSpriteName);
    }

    if (name in animatedSpriteData) {
      return this.createAnimatedSprite(name as AnimatedSpriteName);
    }

    throw new Error(`Did not handle ${name}`);
  }

  private createStaticSprite(name: StaticSpriteName): PIXI.Sprite {
    const pixiSprite = PIXI.Sprite.from(staticSpriteData[name].image);
    pixiSprite.anchor.set(0.5, 0.5);
    return pixiSprite;
  }

  private createAnimatedSprite(name: AnimatedSpriteName): PIXI.AnimatedSprite {
    const { animationSpeed, scale, sheet } = animatedSpriteData[name];
    const textures = Object.values(this.spritesheets[sheet].textures);
    const pixiSprite = new PIXI.AnimatedSprite(textures);
    pixiSprite.animationSpeed = animationSpeed;
    pixiSprite.anchor.set(0.5, 0.5);
    pixiSprite.scale.set(scale, scale);
    pixiSprite.loop = false;
    pixiSprite.play();
    return pixiSprite;
  }

  private async prepareSpritesheets(): Promise<PixiSpritesheets> {
    return new Promise((res) => {
      const pixiSpritesheets: Partial<PixiSpritesheets> = {};
      for (const [name, data] of Object.entries(spritesheets)) {
        const pixiTexture = PIXI.BaseTexture.from(data.image);
        const pixiSpritesheet = new PIXI.Spritesheet(pixiTexture, data.data);
        pixiSpritesheet.parse(() => {
          pixiSpritesheets[name as SpritesheetName] = pixiSpritesheet;
        });
      }

      res(pixiSpritesheets as PixiSpritesheets);
    });
  }
}
