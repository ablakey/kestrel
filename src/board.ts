export class Board {
  public size: number;
  public cells: HTMLDivElement[] = [];

  constructor(size: number) {
    this.size = size;

    for (let cell = 0; cell < size * size; cell++) {
      const element = document.createElement("div");
      document.querySelector(".square").appendChild(element);
      // element.classList.toggle("none");
      this.cells.push(element);
    }

    setInterval(() => {
      this.cells.forEach((c) => {
        if (Math.random() > 0.95) {
          c.classList.toggle("none");
        }
      });
    }, 100);
  }
}
