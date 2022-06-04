import Victor from "victor";
import { ZIndexes } from "../config";
import { DoodadName } from "../definitions";
import { DoodadDefinition, doodadDefinitions } from "../definitions/doodads";
import { Entity } from "./Entity";

export class Doodad extends Entity {
  doodadName: DoodadName;
  zIndex = ZIndexes.Explosion;

  constructor(args: { name: DoodadName; position: Victor }) {
    super();
    this.doodadName = args.name;
    this.position = args.position.clone();
    this.timeToLive = this.definition.timeToLive;
  }

  get definition(): DoodadDefinition {
    return doodadDefinitions[this.doodadName];
  }
}
