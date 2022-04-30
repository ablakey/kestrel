let nextId = 1;

export class Entity {
  destroyed: boolean;
  spawned: number;
  lifespan?: number;
  id: number;

  constructor(spawned: number) {
    this.destroyed = false;
    this.spawned = spawned;
    this.id = nextId++;
  }
}
