
const GRAVITY = new Vector(0, .098);
const MAX_SPEED = 5;
const AIR_FRICTION = 0.1;

class Particle {

  constructor(pos, color, size) {
    this.pos = pos;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);

    this.color = color;
    this.size = size;

    this.gr = new PIXI.Container();
    const inner = new PIXI.Graphics();
    inner
      .beginFill(this.color)
      .drawCircle(0, 0, this.size, this.size)
      .endFill();
    inner.cacheAsBitmap = true;
    this.gr.addChild(inner);
    this.gr.position.copyFrom(this.pos);
  }

  update(){
    let speed = this.acc.length() * (1 - AIR_FRICTION);
    this.acc = this.acc.unit().multiply(speed);

    speed = this.vel.length() * (1 - AIR_FRICTION);
    this.vel = this.vel.unit().multiply(speed);

    this.acc = this.acc.add(GRAVITY);
    this.vel = this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);

    this.gr.position.copyFrom(this.pos);
  }
}