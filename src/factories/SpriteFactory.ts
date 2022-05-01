import * as PIXI from "pixi.js";

import pixelLaserGreen from "../assets/sprites/pixel_laser_green.png";
import pixelLaserBlue from "../assets/sprites/pixel_laser_blue.png";
import pixelShipBlue from "../assets/sprites/pixel_ship_blue.png";
import pixelShipRed from "../assets/sprites/pixel_ship_red.png";
import planet00 from "../assets/sprites/planet_00.png";

import missile from "../assets/svg/missile.svg";

import explosionSheet from "../assets/spritesheets/explosion.png";
import explosionSheetData from "../assets/spritesheets/explosion.json";
import { Engine } from "../Engine";

const staticSpriteData = {
  Laser: { image: pixelLaserGreen, scale: 1 },
  Proton: { image: pixelLaserBlue, scale: 1 },
  Missile: { image: missile, scale: 0.4 },
  BlueShip: { image: pixelShipBlue, scale: 1 },
  RedShip: { image: pixelShipRed, scale: 1 },
  GreenPlanet1: { image: planet00, scale: 3 },
};

const spritesheets = {
  explosion: {
    image: explosionSheet,
    data: explosionSheetData,
  },
};

const animatedSpriteData = {
  Explosion: {
    sheet: "explosion",
    animationSpeed: 0.2,
    scale: 2.5,
  },
  SmallExplosion: {
    sheet: "explosion",
    animationSpeed: 0.2,
    scale: 1.5,
  },
} as const;

type SpritesheetName = keyof typeof spritesheets;
type StaticSpriteName = keyof typeof staticSpriteData;
type AnimatedSpriteName = keyof typeof animatedSpriteData;
export type SpriteName = StaticSpriteName | AnimatedSpriteName;

type PixiSpritesheets = Record<keyof typeof spritesheets, PIXI.Spritesheet>;

export class SpriteFactory {
  private spritesheets: PixiSpritesheets;
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
    this.spritesheets = this.prepareSpritesheets();
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

  // TODO: does this have to be async? Can we just fudge it a little?
  private prepareSpritesheets(): PixiSpritesheets {
    const pixiSpritesheets: Partial<PixiSpritesheets> = {};
    for (const [name, data] of Object.entries(spritesheets)) {
      const pixiTexture = PIXI.BaseTexture.from(data.image);
      const pixiSpritesheet = new PIXI.Spritesheet(pixiTexture, data.data);
      pixiSpritesheet.parse(() => {
        pixiSpritesheets[name as SpritesheetName] = pixiSpritesheet;
      });
    }

    return pixiSpritesheets as PixiSpritesheets;
  }

  // private async prepareSpritesheets(): Promise<PixiSpritesheets> {
  //   return new Promise((res) => {
  //     const pixiSpritesheets: Partial<PixiSpritesheets> = {};
  //     for (const [name, data] of Object.entries(spritesheets)) {
  //       const pixiTexture = PIXI.BaseTexture.from(data.image);
  //       const pixiSpritesheet = new PIXI.Spritesheet(pixiTexture, data.data);
  //       pixiSpritesheet.parse(() => {
  //         pixiSpritesheets[name as SpritesheetName] = pixiSpritesheet;
  //       });
  //     }

  //     res(pixiSpritesheets as PixiSpritesheets);
  //   });
  // }
}
