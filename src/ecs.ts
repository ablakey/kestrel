export function makeEcs<T extends { type: string }>() {
  type Entity = {
    id: number;
    components: T[];
  };

  let entityIdCounter = 0;

  /**
   * An array of entities, keyed by id.
   * It makes lookup O(1) like an object, but we get the array behaviour.
   * However, when deleting entities, we end up with `undefined` rather than an empty position, so we have to filter
   * `undefined` anyway.  It also makes it a bit cleaner to walk and search by property, since we don't have to
   * turn the object into an array first.
   *
   * None of this is really performance focused yet.
   */
  const entities: (Entity | undefined)[] = [];

  function createEntity(components: T[]) {
    entities[entityIdCounter] = {
      id: entityIdCounter,
      components,
    };

    entityIdCounter++;
  }

  function getEntity(id: number) {
    return entities[id];
  }

  function query(componentTypes: T["type"][]): Entity[] {
    console.log(componentTypes);
    // TODO: given a list of types, find entities that include ALL of the types.
  }

  function deleteEntity(id: number) {
    entities[id] = undefined;
  }

  return { createEntity, getEntity, query, deleteEntity };
}
