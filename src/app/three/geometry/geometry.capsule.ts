import * as THREE from 'three';
import { Float32BufferAttribute, Vector3 } from 'three';

export class CapsuleGeometry extends THREE.BufferGeometry {
  
  parameters: {
    radius: number;
    radiusSegments: number;
    height : number;
    heightSegments: number;
    phiStart: number;
    phiLength: number;
  };

  /**
   * @param [radius=50] — sphere radius. Default is 50.
   * @param [radiusSegments=30] — number of horizontal segments. Minimum value is 3, and the default is 8.
   * @param [height=10] — specify vertical starting angle. Default is 0.
   * @param [heightSegments=1] — specify vertical sweep angle size. Default is Math.PI.
   * @param [phiStart=0] — specify horizontal starting angle. Default is 0.
   * @param [phiLength=Math.PI * 2] — specify horizontal sweep angle size. Default is Math.PI * 2.
   */
  constructor(radius = 50, radiusSegments = 30, height = 10, heightSegments = 1, phiStart = 0, phiLength = Math.PI * 2) {
    super();
    this.type = 'CapsuleGeometry';
    radiusSegments = Math.max(3, Math.floor(radiusSegments));
    const vRadiusSegments = Math.max(2, Math.floor(radiusSegments/4)*2);
    heightSegments = Math.max(1, Math.floor(heightSegments));
    this.parameters = {
      radius: radius,
      radiusSegments : radiusSegments,
      height : height,
      heightSegments: heightSegments,
      phiStart: phiStart,
      phiLength: phiLength,
    };
    let index = 0;
    const grid = [];
    const vertex = new Vector3();
    const normal = new Vector3();
    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];
    const halfBody = height / 2;
    const roundUv = radius * 2 / (radius * 2 + height);
    const heightUv = height / (radius * 2 + height);
    for (let iy = 0; iy <= vRadiusSegments; iy++) {
      let verticesRow = [];
      const v = iy / vRadiusSegments;
      let uOffset = 0;
      if (iy == 0) {
        uOffset = 0.5 / radiusSegments;
      } else if (iy == vRadiusSegments) {
        uOffset = -0.5 / radiusSegments;
      }
      if (v < 0.5) {
        for (let ix = 0; ix <= radiusSegments; ix++) {
          const u = ix / radiusSegments;
          vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(v * Math.PI);
          vertex.y = halfBody + radius * Math.cos(v * Math.PI);
          vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(v * Math.PI);
          vertices.push(vertex.x, vertex.y, vertex.z);
          normal.copy(vertex).normalize();
          normals.push(normal.x, normal.y, normal.z);
          uvs.push(u + uOffset, 1 - v * roundUv);
          verticesRow.push(index++);
        }
        grid.push(verticesRow);
      } if (v > 0.5) {
        for (let ix = 0; ix <= radiusSegments; ix++) {
          const u = ix / radiusSegments;
          vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(v * Math.PI);
          vertex.y = - halfBody + radius * Math.cos(v * Math.PI);
          vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(v * Math.PI);
          vertices.push(vertex.x, vertex.y, vertex.z);
          normal.copy(vertex).normalize();
          normals.push(normal.x, normal.y, normal.z);
          uvs.push(u + uOffset, 1 - heightUv - v * roundUv);
          verticesRow.push(index++);
        }
        grid.push(verticesRow);
      } if (v === 0.5) {
        for (let iy = 0; iy <= heightSegments; iy++) {
          verticesRow = [];
          const vh = iy / heightSegments;
          const bodyHeight = ((iy / heightSegments) - 0.5) * height;
          for (let ix = 0; ix <= radiusSegments; ix++) {
            const u = ix / radiusSegments;
            vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(v * Math.PI);
            vertex.y = -bodyHeight + radius * Math.cos(v * Math.PI);
            vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(v * Math.PI);
            vertices.push(vertex.x, vertex.y, vertex.z);
            normal.copy(vertex).normalize();
            normals.push(normal.x, normal.y, normal.z);
            uvs.push(u + uOffset, 1 - roundUv * 0.5 - (vh * heightUv));
            verticesRow.push(index++);
          }
          grid.push(verticesRow);
        }
      } 
    }
    const heightLength = (vRadiusSegments + heightSegments);
    for (let iy = 0; iy < heightLength; iy++) {
      for (let ix = 0; ix < radiusSegments; ix++) {
        const a = grid[iy][ix + 1];
        const b = grid[iy][ix];
        const c = grid[iy + 1][ix];
        const d = grid[iy + 1][ix + 1];
        if (iy !== 0) indices.push(a, b, d);
        if (iy !== heightLength - 1) indices.push(b, c, d);
      }
    }
    this.setIndex(indices);
    this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  }
}
