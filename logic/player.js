import { useState } from "../mini-framework/index.js";
import { GameMap } from "../map/generator.js";
import { dropBomb } from "./bomb.js";
import { collectPowerUp } from "./powerups.js";

export const handleMove = (e, currentPlayer) => {
  if (e.key == " ") {
    dropBomb();
    return;
  }

  const [players, setPlayers] = useState("players");
  const [map] = useState("map");

  const moves = {
    ArrowUp: { dx: 0, dy: -1, direction: "up" },
    ArrowDown: { dx: 0, dy: 1, direction: "down" },
    ArrowLeft: { dx: -1, dy: 0, direction: "left" },
    ArrowRight: { dx: 1, dy: 0, direction: "right" },
  };

  const move = moves[e.key];

  if (!move) return;

  e.preventDefault();

  const newX = currentPlayer.x + move.dx;
  const newY = currentPlayer.y + move.dy;

  if (!map.isWalkable(newY, newX)) return;

  const updatedPlayers = players.map((p) => {
    if (p.id !== currentPlayer.id) return p;
    p.moove(newX, newY, move.direction);
    return p;
  });

  setPlayers([...updatedPlayers]);

  collectPowerUp(currentPlayer);
};
