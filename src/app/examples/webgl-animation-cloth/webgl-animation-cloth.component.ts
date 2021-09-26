import { Component, OnInit } from '@angular/core';
import { BaseComponent, GeometryComponent, MeshComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-animation-cloth',
  templateUrl: './webgl-animation-cloth.component.html',
  styleUrls: ['./webgl-animation-cloth.component.scss'],
})
export class WebglAnimationClothComponent
  extends BaseComponent<{
    enableWind: boolean;
    showBall: boolean;
    togglePins: () => void;
  }>
  implements OnInit {
  constructor() {
    super(
      {
        enableWind: true,
        showBall: false,
        togglePins: () => {
          this.togglePins();
        },
      },
      [
        { name: 'enableWind', type: 'checkbox', title: 'Enable wind' },
        { name: 'showBall', type: 'checkbox', title: 'Show ball' },
        { name: 'togglePins', type: 'button', title: 'Toggle pins' },
      ]
    );
  }

  DAMPING = 0.03;
  DRAG = 1 - this.DAMPING;
  MASS = 0.1;
  restDistance = 25;

  xSegs = 10;
  ySegs = 10;

  GRAVITY = 981 * 1.4;
  gravity = null;

  TIMESTEP = 18 / 1000;
  TIMESTEP_SQ = this.TIMESTEP * this.TIMESTEP;

  pins = [];

  windForce = new THREE.Vector3(0, 0, 0);

  ballPosition = new THREE.Vector3(0, -45, 0);
  ballSize = 60; //40
  tmpForce = new THREE.Vector3();
  pinsFormation = [];

  ngOnInit(): void {
    this.clothFunction = this.getPlane(
      this.restDistance * this.xSegs,
      this.restDistance * this.ySegs
    );
    this.cloth = new Cloth(
      this.xSegs,
      this.ySegs,
      this.restDistance,
      this.MASS,
      this.clothFunction,
      this.DRAG
    );
    this.gravity = new THREE.Vector3(0, -this.GRAVITY, 0).multiplyScalar(
      this.MASS
    );
    let pins = [6];
    this.pinsFormation.push(pins);
    pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.pinsFormation.push(pins);

    pins = [0];
    this.pinsFormation.push(pins);

    pins = []; // cut the rope ;)
    this.pinsFormation.push(pins);

    pins = [0, this.cloth.w]; // classic 2 pins
    this.pinsFormation.push(pins);
    this.pins = this.pinsFormation[1];
    super.ngOnInit();
  }

  clothGeometry: THREE.BufferGeometry = null;
  sphere: THREE.Mesh = null;

  setClothGeometry(geometry: GeometryComponent) {
    this.clothGeometry = geometry.getGeometry();
  }

  setSphere(sphere: MeshComponent) {
    this.sphere = sphere.getObject3d() as THREE.Mesh;
  }

  cloth: Cloth = null;
  clothFunction: any = null;
  getPlane(width, height) {
    return (u, v, target = null) => {
      const x = (u - 0.5) * width;
      const y = (v + 0.5) * height;
      const z = 0;
      if (target) target.set(x, y, z);
      return { x: x, y: y, z: z };
    };
  }

  togglePins() {
    this.pins = this.pinsFormation[
      ~~(Math.random() * this.pinsFormation.length)
    ];
  }

  diff = new THREE.Vector3();

  satisfyConstraints(p1, p2, distance) {
    this.diff.subVectors(p2.position, p1.position);
    const currentDist = this.diff.length();
    if (currentDist === 0) return; // prevents division by 0
    const correction = this.diff.multiplyScalar(1 - distance / currentDist);
    const correctionHalf = correction.multiplyScalar(0.5);
    p1.position.add(correctionHalf);
    p2.position.sub(correctionHalf);
  }

  simulate(now) {
    const windStrength = Math.cos(now / 7000) * 20 + 40;
    this.windForce.set(
      Math.sin(now / 2000),
      Math.cos(now / 3000),
      Math.sin(now / 1000)
    );
    this.windForce.normalize();
    this.windForce.multiplyScalar(windStrength);
    const particles = this.cloth.particles;
    if (this.controls.enableWind) {
      let indx;
      const normal = new THREE.Vector3();
      const indices = this.clothGeometry.index;
      const normals = this.clothGeometry.attributes.normal;
      for (let i = 0, il = indices.count; i < il; i += 3) {
        for (let j = 0; j < 3; j++) {
          indx = indices.getX(i + j);
          normal.fromBufferAttribute(normals, indx);
          this.tmpForce
            .copy(normal)
            .normalize()
            .multiplyScalar(normal.dot(this.windForce));
          particles[indx].addForce(this.tmpForce);
        }
      }
    }
    for (let i = 0, il = particles.length; i < il; i++) {
      const particle = particles[i];
      particle.addForce(this.gravity);
      particle.integrate(this.TIMESTEP_SQ);
    }
    const constraints = this.cloth.constraints;
    const il = constraints.length;
    for (let i = 0; i < il; i++) {
      const constraint = constraints[i];
      this.satisfyConstraints(constraint[0], constraint[1], constraint[2]);
    }
    this.ballPosition.z = -Math.sin(now / 600) * 90; //+ 40;
    this.ballPosition.x = Math.cos(now / 400) * 70;

    if (this.controls.showBall) {
      this.sphere.visible = true;

      for (let i = 0, il = particles.length; i < il; i++) {
        const particle = particles[i];
        const pos = particle.position;
        this.diff.subVectors(pos, this.ballPosition);
        if (this.diff.length() < this.ballSize) {
          // collided
          this.diff.normalize().multiplyScalar(this.ballSize);
          pos.copy(this.ballPosition).add(this.diff);
        }
      }
    } else {
      this.sphere.visible = false;
    }

    // Floor Constraints

    for (let i = 0, il = particles.length; i < il; i++) {
      const particle = particles[i];
      const pos = particle.position;
      if (pos.y < -250) {
        pos.y = -250;
      }
    }

    // Pin Constraints

    for (let i = 0, il = this.pins.length; i < il; i++) {
      const xy = this.pins[i];
      const p = particles[xy];
      p.position.copy(p.original);
      p.previous.copy(p.original);
    }
  }

  onRender(timer: RendererTimer) {
    if (
      this.cloth !== null &&
      this.clothGeometry !== null &&
      this.sphere !== null
    ) {
      this.simulate(timer.elapsedTime * 1000);
      const p = this.cloth.particles;
      for (let i = 0, il = p.length; i < il; i++) {
        const v = p[i].position;
        this.clothGeometry.attributes.position.setXYZ(i, v.x, v.y, v.z);
      }
      this.clothGeometry.attributes.position.needsUpdate = true;
      this.clothGeometry.computeVertexNormals();
      this.sphere.position.copy(this.ballPosition);
    }
    super.onRender(timer);
  }
}

class Cloth {
  w: number;
  h: number;
  constructor(w, h, restDistance, mass, clothFunction, drag) {
    w = w || 10;
    h = h || 10;
    this.w = w;
    this.h = h;

    const particles = [];
    const constraints = [];

    // Create particles
    for (let v = 0; v <= h; v++) {
      for (let u = 0; u <= w; u++) {
        particles.push(
          new Particle(u / w, v / h, 0, mass, clothFunction, drag)
        );
      }
    }

    for (let v = 0; v < h; v++) {
      for (let u = 0; u < w; u++) {
        constraints.push([
          particles[this.index(u, v)],
          particles[this.index(u, v + 1)],
          restDistance,
        ]);

        constraints.push([
          particles[this.index(u, v)],
          particles[this.index(u + 1, v)],
          restDistance,
        ]);
      }
    }

    for (let u = w, v = 0; v < h; v++) {
      constraints.push([
        particles[this.index(u, v)],
        particles[this.index(u, v + 1)],
        restDistance,
      ]);
    }

    for (let v = h, u = 0; u < w; u++) {
      constraints.push([
        particles[this.index(u, v)],
        particles[this.index(u + 1, v)],
        restDistance,
      ]);
    }
    this.particles = particles;
    this.constraints = constraints;
  }
  particles: any;
  constraints: any;

  index(u, v) {
    return u + v * (this.w + 1);
  }
}

class Particle {
  position;
  previous;
  original;
  a; // acceleration
  mass;
  invMass;
  tmp;
  tmp2;
  drag;
  constructor(x, y, z, mass, clothFunction, drag) {
    this.position = new THREE.Vector3();
    this.previous = new THREE.Vector3();
    this.original = new THREE.Vector3();
    this.a = new THREE.Vector3(0, 0, 0); // acceleration
    this.mass = mass;
    this.invMass = 1 / mass;
    this.tmp = new THREE.Vector3();
    this.tmp2 = new THREE.Vector3();
    this.drag = drag;
    clothFunction(x, y, this.position); // position
    clothFunction(x, y, this.previous); // previous
    clothFunction(x, y, this.original);
  }
  addForce(force) {
    this.a.add(this.tmp2.copy(force).multiplyScalar(this.invMass));
  }

  integrate(timesq) {
    const newPos = this.tmp.subVectors(this.position, this.previous);
    newPos.multiplyScalar(this.drag).add(this.position);
    newPos.add(this.a.multiplyScalar(timesq));

    this.tmp = this.previous;
    this.previous = this.position;
    this.position = newPos;

    this.a.set(0, 0, 0);
  }
}
