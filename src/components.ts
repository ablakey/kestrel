export type Position = {
  type: "Position";
  x: number;
  y: number;
};

export type Rect = {
  type: "Rect";
  width: number;
  height: number;
};

export type Foo = {
  type: "Foo";
};

export type Component = Position | Rect | Foo;
