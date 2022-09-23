const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(1000, 800);
  alignmentSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  separationSlider = createSlider(0, 5, 1, 0.1);

  for (let i = 0; i < 50; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(50);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.move();
    boid.show();
  }
}
