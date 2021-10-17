export class Board {
  private size: number;
  private cells: HTMLDivElement[] = [];
  private cellState: number[];
  private colorMap: Map<number, string | null>;

  constructor(size: number, colorMap: Map<number, string | null>) {
    this.size = size;
    this.colorMap = colorMap;

    // TODO: generate the board in JS so we don't need to provide any CSS.
    // TODO: require a targetElementId, where we place the square element.

    // Populate square with a grid div elements as cells.
    const square = document.querySelector(".square")!;
    for (let cell = 0; cell < size * size; cell++) {
      const cell = document.createElement("div");
      square.appendChild(cell);
      this.cells.push(cell);
    }

    // Populate cellState as a simple row-major array. This allows us to avoid
    // Doing DOM lookups for state. We just need to be careful to ensure this state
    // remains inline with DOM state.
    this.cellState = new Array(size ** 2).fill(0);
  }

  public update(newCellState: number[][]) {
    const flatCellState = newCellState.flat();
    if (flatCellState.length !== this.size ** 2) {
      throw new Error("newCellState must be the same size as Board.");
    }

    flatCellState
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

    this.cellState = flatCellState;
  }
}
