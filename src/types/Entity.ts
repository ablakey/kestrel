let nextId = 1; // Begin at one so that id is always truthy.

export type EntityId = number;

export class Entity {
  destroyed: boolean;
  id: EntityId;
  timeToDestroyed?: number; // ms until entity should be flagged as destroyed.

  constructor() {
    this.destroyed = false;
    this.id = nextId++;
  }
}
