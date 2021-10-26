export type Position = {
  type: "Position";
  x: number;
  y: number;
};

// export type Rect = {
//   type: "Rect";
//   width: number;
//   height: number;
// };

// export type Component = Position | Rect;

class Hero {
  id: number;
  name: string;
  type: "Hero";

  doFoo() {
    console.log(this.name);
  }
}

const x: Hero = {
  id: 1,
  name: "Hello",
  type: "Hero",
};
