export type GameState = {
  showDebug: boolean;
  volume: number;
  isPaused: boolean;
};

export const initialState: GameState = {
  showDebug: false,
  isPaused: false,
  volume: 0,
};
