import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from 'ngx3js';

@Component({
  selector: 'app-webgl-lights-pointlights2',
  templateUrl: './webgl-lights-pointlights2.component.html',
  styleUrls: ['./webgl-lights-pointlights2.component.scss'],
})
export class WebglLightsPointlights2Component extends BaseComponent<{}> {
  constructor() {
    super({}, []);
  }

  objectInfo: {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
  }[] = [];
  ngOnInit() {
    this.objectInfo = [];
    for (let i = 0; i < 500; i++) {
      this.objectInfo.push({
        position: {
          x: 400 * (0.5 - Math.random()),
          y: 50 * (0.5 - Math.random()) + 25,
          z: 200 * (0.5 - Math.random()),
        },
        rotation: {
          x: 180 * (0.5 - Math.random()),
          y: 180 * (0.5 - Math.random()),
          z: 0,
        },
      });
    }
  }

  lightColors: number[] = [
    0xff0040,
    0x0040ff,
    0x80ff80,
    0xffaa00,
    0x00ffaa,
    0xff1100,
  ];

  lights: any[] = [];
  addLight(mesh: MeshComponent) {
    const light = mesh.getObject3d();
    this.lights.push(light);
  }

  onRender(timer: RendererTimer) {
    super.onRender(timer);
    const d = 150;
    const time = timer.elapsedTime;
    this.lights.forEach((light, idx) => {
      switch (idx) {
        case 0:
          light.position.x = Math.sin(time * 0.7) * d;
          light.position.z = Math.cos(time * 0.3) * d;
          break;
        case 1:
          light.position.x = Math.cos(time * 0.3) * d;
          light.position.z = Math.sin(time * 0.7) * d;
          break;
        case 2:
          light.position.x = Math.sin(time * 0.7) * d;
          light.position.z = Math.sin(time * 0.5) * d;
          break;
        case 3:
          light.position.x = Math.sin(time * 0.3) * d;
          light.position.z = Math.sin(time * 0.5) * d;
          break;
        case 4:
          light.position.x = Math.cos(time * 0.3) * d;
          light.position.z = Math.sin(time * 0.5) * d;
          break;
        case 5:
          light.position.x = Math.cos(time * 0.7) * d;
          light.position.z = Math.cos(time * 0.5) * d;
          break;
      }
    });
  }
}
