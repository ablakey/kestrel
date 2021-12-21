import { BaseFactory } from "./BaseFactory";
import * as PIXI from "pixi.js";

import spriteImages from "../assets/sprites/*.png";

// Spritesheets
import spritesheetImages from "../assets/spritesheets/*.png";
import explosionSheetData from "../assets/spritesheets/explosion.json";
import { Game } from "../game";

const staticSpriteData = {
  Laser: { image: spriteImages.pixel_laser_green, scale: 1 },
  Proton: { image: spriteImages.pixel_laser_blue, scale: 1 },
  BlueShip: { image: spriteImages.pixel_ship_blue, scale: 1 },
  RedShip: { image: spriteImages.pixel_ship_red, scale: 1 },
  GreenPlanet1: { image: spriteImages.planet_00, scale: 2 },
} as const;

const spritesheets = {
  explosion: {
    image: spritesheetImages.explosion,
    data: explosionSheetData,
  },
} as const;

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

type SpritesheetName = keyof typeof spritesheets;
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
    const { image, scale } = staticSpriteData[name];
    const pixiSprite = PIXI.Sprite.from(image);
    pixiSprite.anchor.set(0.5, 0.5);
    pixiSprite.scale.set(scale, scale);
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
