// entities/powerup.js
export class PowerUp {
  constructor(x, y, type) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.type = type;
    this.icones = {
      range: "🔥",
      maxBombs: "🧨",
      speed: "👟",
    };
  }
}
