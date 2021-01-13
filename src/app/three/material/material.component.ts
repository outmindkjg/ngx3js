import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit, OnChanges {

  @Input() type: string = "lambert";
  @Input() color: string | number = 0xffffff;
  @Input() opacity: number = 1;
  @Input() transparent: boolean = false;
  @Input() wireframe: boolean = false;
  @Input() shading: string = null;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type || changes.color) {
      this.material = null;
    }
    if (this.refMaterial != null) {
      this.refMaterial.copy(this.getMaterial());
    }
  }

  getColor(def: string | number): string | number {
    if (this.color === null) {
      return def;
    } else {
      const color = this.color.toString();
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return this.color;
      }
    }
  }

  getShading(def: string): THREE.Shading {
    const shading = (this.shading === null) ? def : this.shading;
    switch (shading.toLowerCase()) {
      case 'smooth':
        return THREE.SmoothShading;
      case 'flat':
      default:
        return THREE.FlatShading;
    }
  }

  private material: THREE.Material = null;
  private refMaterial: THREE.Material = null;
  setMaterial(refMaterial: THREE.Material) {
    this.refMaterial = refMaterial;
  }

  getMaterial(): THREE.Material {
    if (this.material === null) {
      switch (this.type.toLowerCase()) {
        case 'linebasic':
          this.material = new THREE.LineBasicMaterial({
            color: this.getColor(0xffffff)
          })
          break;
        case 'linedashed':
          this.material = new THREE.LineDashedMaterial({
            color: this.getColor(0xffffff)
          })
          break;
        case 'meshbasic':
          this.material = new THREE.MeshBasicMaterial({
            color: this.getColor(0xffffff),
            wireframe: this.wireframe
          })
          break;
        case 'meshdepth':
          this.material = new THREE.MeshDepthMaterial({
            wireframe: this.wireframe
          });
          break;
        case 'meshdistance':
          this.material = new THREE.MeshDistanceMaterial({

          });
          break;
        case 'meshmatcap':
          this.material = new THREE.MeshMatcapMaterial({

          });
          break;
        case 'meshnormal':
          this.material = new THREE.MeshNormalMaterial({

          });
          break;
        case 'meshphong':
          this.material = new THREE.MeshPhongMaterial({

          });
          break;
        case 'meshphysical':
          this.material = new THREE.MeshPhysicalMaterial({

          });
          break;
        case 'meshstandard':
          this.material = new THREE.MeshStandardMaterial({

          });
          break;
        case 'meshtoon':
          this.material = new THREE.MeshToonMaterial({

          });
          break;
        case 'points':
          this.material = new THREE.PointsMaterial({

          });
          break;
        case 'rawshader':
          this.material = new THREE.RawShaderMaterial({

          });
          break;
        case 'shader':
          this.material = new THREE.ShaderMaterial({

          });
          break;
        case 'shadow':
          this.material = new THREE.ShadowMaterial({

          });
          break;
        case 'sprite':
          this.material = new THREE.SpriteMaterial({

          });
          break;
        case 'meshlambert':
        default:
          this.material = new THREE.MeshLambertMaterial({
            color: this.getColor(0xffffff),
            opacity : this.opacity,
            transparent : this.transparent,
            wireframe: this.wireframe
          });
          break;
      }
    }
    return this.material;
  }
}
