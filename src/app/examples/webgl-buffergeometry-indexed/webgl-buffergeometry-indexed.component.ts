import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-buffergeometry-indexed',
  templateUrl: './webgl-buffergeometry-indexed.component.html',
  styleUrls: ['./webgl-buffergeometry-indexed.component.scss'],
})
export class WebglBuffergeometryIndexedComponent extends BaseComponent<{}> {
  constructor() {
    super({}, []);
  }

  ngOnInit() {
    const indices = [];
    const vertices = [];
    const normals = [];
    const colors = [];

    const size = 20;
    const segments = 10;

    const halfSize = size / 2;
    const segmentSize = size / segments;

    // generate vertices, normals and color data for a simple grid geometry

    for (let i = 0; i <= segments; i++) {
      const y = i * segmentSize - halfSize;

      for (let j = 0; j <= segments; j++) {
        const x = j * segmentSize - halfSize;

        vertices.push(x, -y, 0);
        normals.push(0, 0, 1);

        const r = x / size + 0.5;
        const g = y / size + 0.5;

        colors.push(r, g, 1);
      }
    }

    // generate indices (data for element array buffer)

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + (j + 1);
        const b = i * (segments + 1) + j;
        const c = (i + 1) * (segments + 1) + j;
        const d = (i + 1) * (segments + 1) + (j + 1);

        // generate two faces (triangles) per iteration

        indices.push(a, b, d); // face one
        indices.push(b, c, d); // face two
      }
    }
    this.indices = indices;
    this.vertices = vertices;
    this.normals = normals;
    this.colors = colors;
  }

  indices: number[] = [];
  vertices: number[] = [];
  normals: number[] = [];
  colors: number[] = [];
}
