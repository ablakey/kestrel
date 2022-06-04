export type Relations = Record<Politics["team"], number>;
export type AllRelations = Record<Politics["team"], Relations>;

export interface Politics {
  kind: "Politics";
  team: "Independent" | "Player" | "Rebellion" | "Confederacy";
  relations: Relations;
}
