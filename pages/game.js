import { El, router, useState } from "../mini-framework/index.js";
import { GameMap } from "../map/generator.js";
import { handleMove } from "../logic/player.js";

const playerColor = (nickname) => {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360}, 70%, 60%)`;
};

export function gamePage() {
  const [currentPlayer] = useState("currentPlayer");
  const [players] = useState("players");

  if (!currentPlayer || !players || players.length < 2) router.navigate("#");

  const gameMap = new GameMap();
  gameMap.generateBlock();

  const [map] = useState("map", gameMap);
  const [bombs] = useState("bombs", []);
  const [powerups] = useState("powerups", []);

  return El(
    "div",
    {
      id: "app",
      tabindex: "0",
      autofocus: true,
      onKeydown: (e) => handleMove(e, currentPlayer),
    },
    El(
      "div",
      { id: "ui" },
      ...players.map((p) =>
        El(
          "div",
          {
            key: p.id,
            class: "player-card",
            style: `--player-color: ${playerColor(p.nickname)}`,
          },
          El(
            "div",
            { class: "player-card-header" },
            El(
              "div",
              { class: "player-avatar-small" },
              p.nickname[0].toUpperCase(),
            ),
            El("span", { class: "player-card-name" }, p.nickname),
          ),
          El(
            "div",
            { class: "player-card-stats" },
            El(
              "span",
              { class: "stat" },
              `❤️ ${"🩸".repeat(p.remaininglife)}${"🖤".repeat(p.maxlife - p.remaininglife)}`,
            ),
            El("span", { class: "stat" }, `💣 ${p.maxBombs}`),
            El("span", { class: "stat" }, `🔥 ${p.range}`),
          ),
        ),
      ),
    ),
    El(
      "div",
      { id: "map" },
      El(
        "div",
        { class: "grid" },
        map.grid
          .flat()
          .map((cell, i) =>
            El("div", { key: i, class: `cell ${map.classes[cell]}` }),
          ),
      ),
      El(
        "div",
        { id: "players" },
        players.map((p) =>
          El(
            "div",
            {
              key: p.id,
              class: "player",
              style: `--player-color: ${playerColor(p.nickname)}; --px: ${p.x * 40}px; --py: ${p.y * 40}px`,
            },
            El("span", { class: "player-label" }, p.nickname[0].toUpperCase()),
          ),
        ),
      ),
      El(
        "div",
        { id: "bombs" },
        bombs.map((b) =>
          El(
            "div",
            {
              key: b.id,
              class: "bomb",
              style: `--px: ${b.x * 40}px; --py: ${b.y * 40}px`,
            },
            El("span", null, "💣"),
          ),
        ),
      ),
      El(
        "div",
        { id: "powerups" },
        powerups.map((pw) =>
          El(
            "div",
            {
              key: pw.id,
              class: "powerup",
              style: `--px: ${pw.x * 40}px; --py: ${pw.y * 40}px`,
            },
            El("span", { class: `${pw.type}` }, pw.icones[pw.type]),
          ),
        ),
      ),
    ),
  );
}
