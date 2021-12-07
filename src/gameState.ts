export type GameState = {
  showDebug: boolean;
  volume: number;
};

export const initialState: GameState = {
  showDebug: false,
  volume: 0,
};
