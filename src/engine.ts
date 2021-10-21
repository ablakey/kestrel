export type GameState = { [key: string]: any } & { board: number[][] };
export type KeyState = { [key: string]: boolean };

type ColorMap = Map<number, string | null>;

type System = <G extends GameState, K extends KeyState>(
  deltaTime: number,
  gameState: G,
  keyState: K
) => void;

export class Engine<G extends GameState, K extends KeyState, S extends System> {
  private gameState: G;
  private keyState: K;
  private systems: S[];
  private board: Board;

  constructor(config: {
    systems: S[];
    initialGameState: G;
    inputKeys: (keyof K)[];
    width: number;
    colorMap: ColorMap;
    height: number;
  }) {
    this.gameState = config.initialGameState;
    this.keyState = Object.fromEntries(config.inputKeys.map((k) => [k, false])) as K;
    this.systems = config.systems;
    this.board = new Board(config.width, config.height, config.colorMap);
  }

  public start() {
    window.requestAnimationFrame(this.update);
  }

  private update(deltaTime: number) {
    this.systems.forEach((system) => system(deltaTime, this.gameState, this.keyState));
    this.board.update(this.gameState.board);
    window.requestAnimationFrame(this.update);
  }
}

export class Board {
  private width: number;
  private height: number;
  private cells: HTMLDivElement[];
  private colorMap: ColorMap;
  private cellState: number[];

  constructor(width: number, height: number, colorMap: ColorMap) {
    this.width = width;
    this.height = height;
    this.colorMap = colorMap;

    this.cells = [];
    const square = document.querySelector(".square")!;
    for (let cell = 0; cell < width * height; cell++) {
      const cell = document.createElement("div");
      square.appendChild(cell);
      this.cells.push(cell);
    }

    this.cellState = new Array(width * height).fill(0);
  }

  public update(newCellState: number[][]) {
    if (newCellState.length !== this.width * this.height) {
      throw new Error("newCellState must be the same size as Board.");
    }

    newCellState
      .flat()
      .map((n, idx) => (n !== this.cellState[idx] ? n : undefined))
      .forEach((n, idx) => {
        if (n === undefined) {
          return;
        }

        const newColor = this.colorMap.get(n);
        if (newColor === undefined) {
          throw new Error("Tried to set state to a color not provided in colorMap.");
        } else if (newColor === null) {
          this.cells[idx].style.opacity = "0";
        } else {
          this.cells[idx].style.opacity = "1";
          this.cells[idx].style.background = newColor;
        }
      });

    this.cellState = newCellState.flat();
  }
}
