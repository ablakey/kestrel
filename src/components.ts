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

export type Component = Position | Rect;
