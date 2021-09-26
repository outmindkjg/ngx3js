import { Component } from '@angular/core';
import { BaseComponent, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-lines-sphere',
  templateUrl: './webgl-lines-sphere.component.html',
  styleUrls: ['./webgl-lines-sphere.component.scss'],
})
export class WebglLinesSphereComponent extends BaseComponent<{}> {
  constructor() {
    super({}, []);
  }

  ngOnInit() {
    const vertices = [];
    const vertex = new THREE.Vector3();
    const r = 450;
    for (let i = 0; i < 1500; i++) {
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      vertex.normalize();
      vertex.multiplyScalar(r);
      vertices.push(vertex.x, vertex.y, vertex.z);
      vertex.multiplyScalar(Math.random() * 0.09 + 1);
      vertices.push(vertex.x, vertex.y, vertex.z);
    }
    this.vertices = vertices;

    [[ 0.25, 0xff7700, 1 ], [ 0.5, 0xff9900, 1 ], [ 0.75, 0xffaa00, 0.75 ], [ 1, 0xffaa00, 0.5 ], [ 1.25, 0x000833, 0.8 ],
    [ 3.0, 0xaaaaaa, 0.75 ], [ 3.5, 0xffffff, 0.5 ], [ 4.5, 0xffffff, 0.25 ], [ 5.5, 0xffffff, 0.125 ]].forEach(p => {
      this.parameters.push({
        scale : p[0],
        color : p[1],
        opacity : p[2],
        rotation : Math.random() * 180
      });
    });
  }

  vertices: number[] = [];

  parameters: { scale: number; color: number; opacity: number, rotation : number }[] = [];
  
}
