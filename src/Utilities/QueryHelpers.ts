import { BaseUtility } from "./BaseUtility";

export class QueryHelpers extends BaseUtility {
  /**
   * From all possible targets, get the next one by indexing one beyond previousTarget.
   * This depends on ecs.query returning stable results.
   */
  getNextTarget(prevTarget: number | null): number | null {
    this.ecs.query(["AI"]);
    return null;
  }
}
