import Victor from "victor";
import { Entity } from "./types/Entity";

export interface IRenderable extends Entity {
  position: Victor;
  yaw: Victor;
  // sprite: SpriteName;
}
