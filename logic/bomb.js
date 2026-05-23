import { Bomb } from "../entities/bomb.js";
import { useState } from "../mini-framework/index.js";
import { spawnPowerUp } from "./powerups.js";

export const dropBomb = () => {
  const [bombs, setBombs] = useState("bombs");
  const [player] = useState("currentPlayer");

  if (!player.canPlaceBomb()) return;

  const newBomb = new Bomb(player.x, player.y, player.range);
  player.activeBombs++;
  setBombs([...bombs, newBomb]);

  setTimeout(() => {
    player.activeBombs--;
    triggerExplosion(newBomb);
    const [currentBombs, setCurrentBombs] = useState("bombs");
    setCurrentBombs(currentBombs.filter((b) => b.id !== newBomb.id));
  }, newBomb.duration);
};

function triggerExplosion(bomb) {
  const [map, setMap] = useState("map");
  const [powerups, setPowerups] = useState("powerups");
  const [players, setPlayers] = useState("players");

  const cellsAffected = bomb.explode(map);

  cellsAffected.forEach(({ x, y }) => {
    if (map.grid[y][x] === map.tiles.block) {
      map.removeBlock(y, x);
      const pu = spawnPowerUp(x, y);
      if (pu) setPowerups([...powerups, pu]);
    }

    players.forEach((p) => {
      if (p.x === x && p.y === y) {
        p.loseLife();
      }
    });
  });

  setPlayers(players.filter((p) => !p.isDead()));
  setMap(map);
}