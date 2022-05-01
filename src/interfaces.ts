import Victor from "victor";
import { SpriteName } from "./factories/SpriteFactory";
import { Entity } from "./types/Entity";

export interface IRenderable extends Entity {
  position: Victor;
  yaw: Victor;
  sprite: SpriteName;
  zIndex: number;
}

export type IPlayer = Entity;
