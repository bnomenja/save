import { Bomb } from "../entities/bomb.js";
import { PowerUp } from "../entities/powerup.js";
import { useState } from "../mini-framework/index.js";
import { spawnPowerUp } from "./powerups.js";

export const dropBomb = () => {
  const [bombs, setBombs] = useState("bombs");
  const [player, setPlayer] = useState("currentPlayer");

  if (!player.canPlaceBomb()) return;

  const newBomb = new Bomb(player.x, player.y, player.range);

  player.activeBombs++;

  setBombs([...bombs, newBomb]);

  setTimeout(() => {
    player.activeBombs--;
    triggerExplosion(newBomb, player);
    setBombs(bombs.filter((b) => b.id != b));
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

        if (p.isDead())
          setPlayers(players.filter((alivePlayer) => !alivePlayer.isDead()));
        // else : make player immortal for few seconds
      }
    });
  });

  setMap(map);
}
