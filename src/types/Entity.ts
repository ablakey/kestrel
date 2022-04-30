let nextId = 1;

export type EntityId = number;

export class Entity {
  destroyed: boolean;
  spawned: number;
  lifespan?: number;
  id: EntityId;

  constructor(spawned: number) {
    this.destroyed = false;
    this.spawned = spawned;
    this.id = nextId++;
  }
}
