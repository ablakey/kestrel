export type Position = {
  type: "Position";
  x: number;
  y: number;
  yaw: number;
};

export type Rect = {
  type: "Rect";
  width: number;
  height: number;
};

export type UserInput = {
  type: "UserInput";
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

export type Component = Position | Rect | UserInput;
