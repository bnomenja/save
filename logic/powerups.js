import { PowerUp } from "../entities/powerup.js";
import { useState } from "../mini-framework/index.js";

const POWERUP_TYPES = ["range", "maxBombs", "speed"];
const POWERUP_CHANCE = 0.3;

export const spawnPowerUp = (x, y, probability = POWERUP_CHANCE) => {
  if (Math.random() > probability) return null;

  const type = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];

  return new PowerUp(x, y, type);
};

export const collectPowerUp = (player) => {
  const [powerups, setPowerups] = useState("powerups");

  const collected = powerups.filter(
    (p) => p.x === player.x && p.y === player.y,
  );
  if (collected.length === 0) return;

  collected.forEach((pu) => {
    if (pu.type === "range") player.range++;
    if (pu.type === "maxBombs") player.maxBombs++;
    if (pu.type === "speed") player.speed = (player.speed ?? 1) + 1;
  });

  const [players, setPlayers] = useState("players");
  setPlayers([...players]); // force re-render pour mettre à jour le joueur

  setPowerups(powerups.filter((p) => p.x !== player.x || p.y !== player.y));
};
