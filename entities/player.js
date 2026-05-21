export class Player {
  constructor(x, y, nickname) {
    this.id = crypto.randomUUID();
    this.nickname = nickname;
    this.x = x;
    this.y = y;
    this.direction = "down";
    this.maxBombs = 1;
    this.activeBombs = 0;
    this.range = 2;
    this.maxlife = 3;
    this.remaininglife = 3;
  }

  moove(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  canPlaceBomb() {
    return this.activeBombs < this.maxBombs;
  }

  loseLife() {
    this.remaininglife--;
  }

  isDead() {
    return this.remaininglife <= 0;
  }
}
