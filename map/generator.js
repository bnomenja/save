import { DEFAULT_DENSITY, DEFFAULT_GRID, TILES } from "./const.js";

export class GameMap {
  // Initializes the server-side map with dimensions and a grid
  constructor(density) {
    this.density = density ?? DEFAULT_DENSITY;
    this.grid = DEFFAULT_GRID.map((row) => [...row]);
    this.tiles = TILES;
    this.classes = {
      [TILES.empty]: "empty",
      [TILES.wall]: "wall",
      [TILES.block]: "block",
    };
  }

  // Generates random destructible blocks where it can be
  generateBlock() {
    const grid = this.grid;
    const ROWS = grid.length - 1; // max row index
    const COLS = grid.at(0).length - 1; // max column index

    this.grid = grid.map((line, row) => {
      return line.map((cell, col) => {
        if (cell === 0 && !this.isInSpawnZone(row, col, ROWS, COLS)) {
          return Math.random() < this.density ? TILES.block : TILES.empty;
        }
        return cell;
      });
    });
  }

  //check if the current position is within the corners
  isInSpawnZone(currentRow, currentCol, maxRow, maxCol) {
    const r = maxRow - 1;
    const c = maxCol - 1;

    return (
      // top left
      (currentRow === 1 && currentCol === 1) ||
      (currentRow === 1 && currentCol === 2) ||
      (currentRow === 2 && currentCol === 1) ||
      // top right
      (currentRow === 1 && currentCol === c) ||
      (currentRow === 1 && currentCol === c - 1) ||
      (currentRow === 2 && currentCol === c) ||
      // bottom left
      (currentRow === r && currentCol === 1) ||
      (currentRow === r - 1 && currentCol === 1) ||
      (currentRow === r && currentCol === 2) ||
      // bottom right
      (currentRow === r && currentCol === c) ||
      (currentRow === r - 1 && currentCol === c) ||
      (currentRow === r && currentCol === c - 1)
    );
  }

  // Checks if a specific tile (x, y) is empty and walkable
  isWalkable(row, col) {
    return this.grid[row][col] === TILES.empty;
  }

  // Removes a destructible block from the grid (after explosion)
  removeBlock(row, col) {
    this.grid[row][col] = TILES.empty;
  }
}
