import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page0204',
  templateUrl: './page0204.component.html',
  styleUrls: ['./page0204.component.scss']
})
export class Page0204Component implements OnInit {

  geoms: {
    type: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
    color: number,
    param: {
      radius?: number;
      radialSegments?: number;
      width?: number;
      widthSegments?: number;
      height?: number;
      heightSegments?: number;
      depth?: number;
      depthSegments?: number;
      thetaStart?: number;
      thetaLength?: number;
      thetaSegments?: number;
      radiusTop?: number;
      radiusBottom?: number;
      detail?: number;
      innerRadius?: number;
      outerRadius?: number;
      phiStart?: number;
      phiLength?: number;
      segments?: number;
      phiSegments?: number;
      tube?: number;
      tubularSegments?: number;
      arc?: number;
      p?: number;
      q?: number;
      points?: { x: number, y: number, z?: number }[];
      parametric? : string ;
      slices?: number;
      stacks?: number;
    }
  }[] = []

  constructor() { }

  ngOnInit(): void {
    this.geoms.push({
      type: 'Cylinder',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        radiusTop: 1,
        radiusBottom: 4,
        height: 4
      }
    });
    this.geoms.push({
      type: 'box',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        width: 2,
        height: 2,
        depth: 2
      }
    });
    this.geoms.push({
      type: 'Sphere',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        radius: 2
      }
    });
    this.geoms.push({
      type: 'Icosahedron',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        radius: 4
      }
    });
    this.geoms.push({
      type: 'convex',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        points: [
          { x: 2, y: 2, z: 2 },
          { x: 2, y: 2, z: -2 },
          { x: -2, y: 2, z: -2 },
          { x: -2, y: 2, z: 2 },
          { x: 2, y: -2, z: 2 },
          { x: 2, y: -2, z: -2 },
          { x: -2, y: -2, z: -2 },
          { x: -2, y: -2, z: 2 }
        ]
      }
    });
    var pts = [];
    var detail = .1;
    var radius = 3;//radius for half_sphere
    for (var angle = 0.0; angle < Math.PI; angle += detail) {
        pts.push({ x : Math.cos(angle) * radius, y : Math.sin(angle) * radius});//angle/radius to x,z
    }
    this.geoms.push({
      type: 'lathe',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        points: pts,
        segments : 12
      }
    });
    this.geoms.push({
      type: 'Octahedron',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        radius: 3
      }
    });
    this.geoms.push({
      type: 'Parametric',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        parametric: 'mobius3d'
      }
    });
    this.geoms.push({
      type: 'Tetrahedron',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        radius: 3
      }
    });
    this.geoms.push({
      type: 'Torus',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        radius: 3,
        tube: 1,
        radialSegments: 10,
        tubularSegments: 10
      }
    });
    this.geoms.push({
      type: 'TorusKnot',
      color: 0,
      position: { x: 0, y: 0, z: 0 },
      param: {
        radius: 3,
        tube: 0.5,
        radialSegments: 50,
        tubularSegments: 20
      }
    });
    
    this.geoms.forEach((geo, idx) => {
      geo.color = Math.random() * 0xffffff;
      geo.position.x = -24 + ((idx % 4) * 12);
      geo.position.y = 4;
      geo.position.z = -8 + (Math.floor(idx / 4) * 12);
    })
  }

}
