import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-geometry',
  templateUrl: './geometry.component.html',
  styleUrls: ['./geometry.component.scss']
})
export class GeometryComponent implements OnInit {

  @Input() type: string = "sphere";
  @Input() radius: number = 0;
  @Input() radialSegments: number = 0;
  @Input() width: number = 1;
  @Input() widthSegments: number = 1;
  @Input() height: number = 1;
  @Input() heightSegments: number = 1;
  @Input() thetaStart: number = 0;
  @Input() thetaLength: number = 0;
  @Input() thetaSegments: number = 0;
  @Input() radiusTop: number = 0;
  @Input() radiusBottom: number = 0;
  @Input() detail: number = 0;
  @Input() innerRadius: number = 0;
  @Input() outerRadius: number = 0;
  @Input() phiStart: number = 0;
  @Input() phiLength: number = 0;
  @Input() phiSegments: number = 0;
  @Input() tube: number = 0;
  @Input() tubularSegments: number = 0;
  @Input() arc: number = 0;
  @Input() p: number = 0;
  @Input() q: number = 0;
 
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.geometry = null;
    }
  }

  private geometry: THREE.Geometry | THREE.BufferGeometry = null;

  getGeometry(): THREE.Geometry | THREE.BufferGeometry {
    if (this.geometry === null) {
      switch (this.type.toLowerCase()) {
        case 'boxbuffer':
          this.geometry = new THREE.BoxBufferGeometry(4, 4, 4);
          break;
        case 'box':
          this.geometry = new THREE.BoxGeometry(4, 4, 4);
          break;
        case 'circlebuffer':
          this.geometry = new THREE.CircleBufferGeometry(4, 4, 4);
          break;
        case 'circle':
          this.geometry = new THREE.CircleGeometry(4, 4, 4);
          break;
        case 'conebuffer':
          this.geometry = new THREE.ConeBufferGeometry(4, 4, 4);
          break;
        case 'cone':
          this.geometry = new THREE.ConeGeometry(4, 4, 4);
          break;
        case 'cylinderbuffer':
          this.geometry = new THREE.CylinderBufferGeometry(1, 4, 4);
          break;
        case 'cylinder':
          this.geometry = new THREE.CylinderGeometry(1, 4, 4);
          break;
        case 'dodecahedronbuffer':
          this.geometry = new THREE.DodecahedronBufferGeometry(1, 4);
          break;
        case 'dodecahedron':
          this.geometry = new THREE.DodecahedronGeometry(1, 4);
          break;
        case 'icosahedronbuffer':
          this.geometry = new THREE.IcosahedronBufferGeometry(4);
          break;
        case 'icosahedron':
          this.geometry = new THREE.IcosahedronGeometry(4);
          break;
        case 'octahedronbuffer':
          this.geometry = new THREE.OctahedronBufferGeometry(3);
          break;
        case 'octahedron':
          this.geometry = new THREE.OctahedronGeometry(3);
          break;
        case 'planebuffer':
          this.geometry = new THREE.PlaneBufferGeometry(
            this.width, 
            this.height, 
            this.widthSegments, 
            this.heightSegments
          );
          break;
        case 'plane':
          this.geometry = new THREE.PlaneGeometry(
            this.width, 
            this.height, 
            this.widthSegments, 
            this.heightSegments
          );
          break;
        case 'ringbuffer':
          this.geometry = new THREE.RingBufferGeometry(60, 20, 1, 1);
          break;
        case 'ring':
          this.geometry = new THREE.RingGeometry(60, 20, 1, 1);
          break;
        case 'spherebuffer':
          this.geometry = new THREE.SphereBufferGeometry(4, 20, 20);
          break;
        case 'sphere':
          this.geometry = new THREE.SphereGeometry(4, 20, 20);
          break;
        case 'tetrahedronbuffer':
          this.geometry = new THREE.TetrahedronBufferGeometry(3);
          break;
        case 'tetrahedron':
          this.geometry = new THREE.TetrahedronGeometry(3);
          break;
        case 'torusbuffer':
          this.geometry = new THREE.TorusBufferGeometry(3, 1, 10, 10);
          break;
        case 'torus':
          this.geometry = new THREE.TorusGeometry(3, 1, 10, 10);
          break;
        case 'torusknotbuffer':
          this.geometry = new THREE.TorusKnotBufferGeometry(3, 0.5, 50, 20);;
          break;
        case 'torusknot':
          this.geometry = new THREE.TorusKnotGeometry(3, 0.5, 50, 20);;
          break;
        default:
          this.geometry = new THREE.PlaneGeometry(60, 20, 1, 1);
          break;
      }
      console.log(this.geometry);
    }
    return this.geometry;
  }
}
