import Victor from "victor";
import { ZIndex } from "../config";
import { PlanetName } from "../definitions";
import { PlanetDefinition, planetDefinitions } from "../definitions/planets";
import { IRenderable } from "../interfaces";
import { Entity } from "./Entity";

export class Planet extends Entity implements IRenderable {
  name: PlanetName;
  zIndex = ZIndex.Planet;

  constructor(args: { name: PlanetName; position: Victor }) {
    super();
    this.name = args.name;
    this.position = args.position.clone();
  }

  get definition(): PlanetDefinition {
    return planetDefinitions[this.name];
  }
}
