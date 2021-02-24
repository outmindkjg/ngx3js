import { RigidbodyComponent } from './../../three/rigidbody/rigidbody.component';
import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page1305',
  templateUrl: './page1305.component.html',
  styleUrls: ['./page1305.component.scss']
})
export class Page1305Component implements OnInit {

  controls = {
    velocity : {
      x : 0,
      y : 0,
      z : 0,
      apply : () => {
        if (this.sphereRigidBody !== null) {
          this.sphereRigidBody.setMotionStatePosition(0, 5, 0);
          this.sphereRigidBody.setVelocity(
            this.controls.velocity.x,
            this.controls.velocity.y,
            this.controls.velocity.z,
            'linear');
        }
      }
    },
    rotate: true,
    wireframe: false,
  }

  sphereRigidBody : RigidbodyComponent = null;
  loadSphereRigidBody(sphereRigidBody : RigidbodyComponent) {
    this.sphereRigidBody = sphereRigidBody;
  }

  controlsParams: GuiControlParam[] = [
    { name: "Velocity", type: "folder", control : 'velocity', children : [
      { name: "x", type: "number", min : -10, max : 10, step : 0.1 },
      { name: "y", type: "number", min : -10, max : 10, step : 0.1 },
      { name: "z", type: "number", min : -10, max : 10, step : 0.1 },
      { name: "apply", type: "button"},
    ]},
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }

  }
}
