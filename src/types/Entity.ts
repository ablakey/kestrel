let nextId = 1; // Begin at one so that id is always truthy.

export type EntityId = number;

export class Entity {
  destroyed: boolean;
  lifespan?: number;
  id: EntityId;

  constructor() {
    this.destroyed = false;
    this.id = nextId++;
  }
}
