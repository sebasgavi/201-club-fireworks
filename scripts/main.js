const app = new PIXI.Application({
  width: window.innerWidth, height: window.innerHeight, backgroundColor: 0, transparent: true,
});
app.renderer
document.body.appendChild(app.view);

const messages = [
  'Inifinite void',
  'Al fin se acabó el semestre',
  'One more time, but with feeling.',
  'fix bug, for realz',
  'Just stop reading these for a while, ok..',
  'Gaviria no nos quiere :(',
  'Graciasssss',
  'Quiero ver web el prox semestre :0',
];

const randomText = () => {
  document.querySelector('h1').innerText = messages[Math.floor(Math.random() * messages.length)];
}

randomText();

setInterval(randomText, 3000);

const rockets = [];
const particles = [];

const trigger = (x) => {
  const pos = new Vector(x || Math.random() * window.innerWidth, window.innerHeight);
  const r = new Particle(pos, Math.random() * 0xffffff, Math.random() * 5 + 10);
  r.acc = new Vector(0, Math.random() * -3 - 7);
  rockets.push(r);
  app.stage.addChild(r.gr);
}

window.addEventListener('click', (ev) => {
  trigger(ev.clientX);
});

const explode = (rocket) => {
  const q = Math.floor(Math.random() * 30 + 20);
  for(let i = 0; i < q; i++){
    const p = new Particle(rocket.pos.clone(), rocket.color, Math.random() * 3 + 2);
    p.acc = Vector.fromAngles(0, Math.random() * Math.PI * 4).multiply(Math.random() * 3 + 2);
    particles.push(p);
    app.stage.addChild(p.gr);
    p.gr.alpha = 1;
  }
}

let count = 0;
app.ticker.add((delta) => {
  count++;
  if(count % 10 === 0) trigger();

  rockets.forEach((r, index) => {
    r.update();
    if(r.vel.y >= 0){
      rockets.splice(index, 1);
      app.stage.removeChild(r.gr);
      r.gr.destroy(true);
      explode(r);
    }
  });

  particles.forEach((p, index) => {
    p.update();
    p.gr.alpha = p.gr.alpha - .03;
    if(p.gr.alpha <= 0){
      particles.splice(index, 1);
      app.stage.removeChild(p.gr);
      p.gr.destroy(true);
    }
  });
});