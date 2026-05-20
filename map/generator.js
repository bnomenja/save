import { DEFAULT_DENSITY, DEFFAULT_GRID, TILES } from "./const.js";

export class GameMap {
  // Initializes the server-side map with dimensions and a grid
  constructor(density = DEFAULT_DENSITY) {
    this.density = density;
    this.grid = DEFFAULT_GRID;
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
    return (
      // top left
      (currentRow === 1 && currentCol === 1) ||
      (currentRow === 1 && currentCol === 2) ||
      (currentRow === 2 && currentCol === 1) ||
      // top right
      (currentRow === 1 && currentCol === maxCol) ||
      (currentRow === 1 && currentCol === maxCol - 1) ||
      (currentRow === 2 && currentCol === maxCol) ||
      // bottom left
      (currentRow === maxRow && currentCol === 1) ||
      (currentRow === maxRow - 1 && currentCol === 1) ||
      (currentRow === maxRow && currentCol === 2) ||
      // bottom right
      (currentRow === maxRow && currentCol === maxCol) ||
      (currentRow === maxRow - 1 && currentCol === maxCol) ||
      (currentRow === maxRow && currentCol === maxCol - 1)
    );
  }

  // Checks if a specific tile (x, y) is empty and walkable
  isWalkable(row, col) {
    return this.grid[row][col] === 0;
  }

  // Removes a destructible block from the grid (after explosion)
  removeBlock(row, col) {}
}
