import Victor from "victor";
import { ZIndex } from "../config";
import { DoodadName } from "../definitions";
import { DoodadDefinition, doodadDefinitions } from "../definitions/doodads";
import { Entity } from "./Entity";

export class Doodad extends Entity {
  name: DoodadName;
  zIndex = ZIndex.Explosion;

  constructor(args: { name: DoodadName; position: Victor }) {
    super();
    this.name = args.name;
    this.position = args.position.clone();
    this.timeToLive = this.definition.timeToLive;
  }

  get definition(): DoodadDefinition {
    return doodadDefinitions[this.name];
  }
}
