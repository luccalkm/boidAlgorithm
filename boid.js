class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(-10, 10));
    this.acceleration = createVector();
    this.maxForce = 1;
    this.minSpeed = 4;
    this.alignRadius = 20;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  flock(boids) {
    this.acceleration.set(0, 0);
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(alignmentSlider.value());
    cohesion.mult(cohesionSlider.value());
    separation.mult(separationSlider.value());

    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
  }

  align(boids) {
    let steering = createVector();
    let total = 0;

    for (let item of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        item.position.x,
        item.position.y
      );

      if (item != this && d < this.alignRadius && d >= 0) {
        steering.add(item.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.minSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let steering = createVector();
    let total = 0;

    for (let item of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        item.position.x,
        item.position.y
      );

      if (item != this && d < this.alignRadius && d >= 10) {
        steering.add(item.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.minSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let steering = createVector();
    let total = 0;

    for (let item of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        item.position.x,
        item.position.y
      );

      if (item != this && d < this.alignRadius && d >= 0) {
        let diff = p5.Vector.sub(this.position, item.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.minSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  move() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.minSpeed);
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}
