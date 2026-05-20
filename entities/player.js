export class Player {
  constructor(x, y, nickname) {
    this.id = crypto.randomUUID();
    this.nickname = nickname;
    this.x = x;
    this.y = y;
    this.direction = "down";
  }

  moove(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = "direction";
  }
}
